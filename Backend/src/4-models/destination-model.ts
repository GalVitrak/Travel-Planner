import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class DestinationModel {
  public destinationId: number;
  public destinationName: string;
  public description: string;
  public image: UploadedFile;
  public imageName: string;

  public constructor(destination: DestinationModel) {
    this.destinationId = destination.destinationId;
    this.destinationName = destination.destinationName;
    this.description = destination.description;
    this.image = destination.image;
    this.imageName = destination.imageName;
  }

  public static validationSchema = Joi.object({
    destinationId: Joi.number().optional().integer().positive(),
    destinationName: Joi.string().required().min(2).max(25),
    description: Joi.string().required().min(5).max(250),
    image: Joi.object().required(),
    imageName: Joi.string().optional(),
  });
  public static validationUpdateSchema = Joi.object({
    destinationId: Joi.number().optional().integer().positive(),
    destinationName: Joi.string().required().min(2).max(25),
    description: Joi.string().required().min(5).max(250),
    image: Joi.object().optional(),
    imageName: Joi.string().required(),
  });

  public validate(): string {
    const result = DestinationModel.validationSchema.validate(this);
    return result.error?.message;
  }

  public validateUpdate(): string {
    const result = DestinationModel.validationUpdateSchema.validate(this);
    return result.error?.message;
  }
}

export default DestinationModel;
