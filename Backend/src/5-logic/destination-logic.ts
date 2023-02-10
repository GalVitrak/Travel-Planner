import fs from "fs";
import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import DestinationModel from "../4-models/destination-model";
import {
  ValidationErrorModel,
  ResourceNotFoundErrorModel,
} from "../4-models/error-models";
import { randomUUID } from "crypto";
import appConfig from "../2-utils/app-config";
import { S3 } from "aws-sdk";
import { UploadedFile } from "express-fileupload";
import awsConfig from "../2-utils/AWS";

const bucketName = awsConfig.bucket_name;

const region = awsConfig.aws_region;

const accessKeyId = awsConfig.aws_access_key_id;

const secretAccessKey = awsConfig.aws_secret_access_key;

const s3 = new S3({

  region,

  accessKeyId,

  secretAccessKey,

});

function uploadFile(image: UploadedFile, imageName: string){
  const fileStream = Buffer.from(image.data);
  const uploadParams ={
    Bucket: bucketName,
    Body: fileStream,
    Key: imageName
  };
  return s3.upload(uploadParams).promise();
}

// get all destinations from DB
async function getAllDestinations(): Promise<DestinationModel[]> {
  const sql = `
      SELECT * FROM destinations`;
  const destinations = await dal.execute(sql);
  return destinations;
}

// get one destination from DB
async function getOneDestination(id: number): Promise<DestinationModel> {
  const sql = `SELECT * FROM destinations WHERE destinationId = ?`;
  const destination = await dal.execute(sql, [id]);
  return destination[0];
}

// add destination to DB
async function addDestination(
  destination: DestinationModel
): Promise<DestinationModel> {
  const err = destination.validate();
  if (err) throw new ValidationErrorModel(err);
  // check if an image has been uploaded, if so write it to assets folder
  if (destination.image) {
    const extension = destination.image.name.substring(
      destination.image.name.lastIndexOf(".")
    );
    destination.imageName = randomUUID() + extension;
    if(process.env.NODE_ENV==="production"){
      uploadFile(destination.image, destination.imageName);
    }
    else{
      await destination.image.mv(
        "./src/1-assets/images/" + destination.imageName
        );
      }
    delete destination.image;
  }
  const sql = `INSERT INTO destinations VALUES(DEFAULT, ?, ?, ?)`;
  const info: OkPacket = await dal.execute(sql, [
    destination.destinationName,
    destination.description,
    destination.imageName,
  ]);
  destination.destinationId = info.insertId;
  return destination;
}

// update a destination in DB
async function updateDestination(
  destination: DestinationModel
): Promise<DestinationModel> {
  const err = destination.validateUpdate();
  if (err) throw new ValidationErrorModel(err);

  // checks if a new image has been uploaded, if so, deletes the old one and write the new one.
  if (destination.image) {
    if(process.env.NODE_ENV!=="production"){
      if (fs.existsSync("./src/1-assets/images/" + destination.imageName))
        fs.unlinkSync("./src/1-assets/images/" + destination.imageName);
    }
    const extension = destination.image.name.substring(
      destination.image.name.lastIndexOf(".")
    );
    destination.imageName = randomUUID() + extension;
    if(process.env.NODE_ENV==="production"){
      uploadFile(destination.image, destination.imageName);
    }
    else{
      await destination.image.mv(
        "./src/1-assets/images/" + destination.imageName
        );
      }
    delete destination.image;
  }
  const sql = `
        UPDATE destinations SET
        destinationName = ?,
        description = ?,
        imageName = ?
        WHERE destinationId = ?`;
  const info: OkPacket = await dal.execute(sql, [
    destination.destinationName,
    destination.description,
    destination.imageName,
    destination.destinationId,
  ]);
  if (info.affectedRows === 0)
    throw new ResourceNotFoundErrorModel(destination.destinationId);
  return destination;
}

// deletes a destination from DB
async function deleteDestination(id: number) {
  const imageNameSql = `SELECT imageName FROM destinations WHERE destinationId = ?`; //gets imageName from DB to delete it from assets folder
  const info: OkPacket = await dal.execute(imageNameSql, [id]);
  if (!info) throw new ResourceNotFoundErrorModel(id);

  //checks if destination's image exists in assets folder, if so, it deletes it.
  if (fs.existsSync("./src/1-assets/images/" + info[0].imageName)) {
    fs.unlinkSync("./src/1-assets/images/" + info[0].imageName);
  }
  const deleteSql = `DELETE FROM destinations WHERE destinationId = ?`;
  await dal.execute(deleteSql, [id]);
}

export default {
  getAllDestinations,
  getOneDestination,
  addDestination,
  updateDestination,
  deleteDestination,
};
