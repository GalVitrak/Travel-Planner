import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import {
  ValidationErrorModel,
  FollowerNotFoundErrorModel,
} from "../4-models/error-models";
import FollowersModel from "../4-models/followers-model";

// //Vacations by Destinations with Filters

async function getVacationsForUserDestinationDateFilter({
  userId,
  destinationId,
  filter,
}): Promise<FollowersModel[]> {
  const sql = `
    SELECT DISTINCT
    V.*,
    DATE_FORMAT(V.startDate, '%d-%m-%Y %H:%i:%S') AS startDate,
    DATE_FORMAT(V.endDate, '%d-%m-%Y %H:%i:%S') AS endDate,
    EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
    COUNT(F.userId) AS followersCount
    FROM vacations AS V LEFT JOIN followers AS F
    ON V.vacationId = F.vacationId
    WHERE V.destinationId = ?
    GROUP BY vacationId
    ORDER BY V.startDate ${filter}
      `;
  const followers = await dal.execute(sql, [userId, destinationId]);
  return followers;
}

async function getVacationsForUserDestinationPriceFilter({
  userId,
  destinationId,
  filter,
}): Promise<FollowersModel[]> {
  const sql = `
      SELECT DISTINCT
      V.*,
      DATE_FORMAT(V.startDate, '%d-%m-%Y %H:%i:%S') AS startDate,
      DATE_FORMAT(V.endDate, '%d-%m-%Y %H:%i:%S') AS endDate,
      EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
      COUNT(F.userId) AS followersCount
      FROM vacations AS V LEFT JOIN followers AS F
      ON V.vacationId = F.vacationId
      WHERE V.destinationId = ?
      GROUP BY vacationId
      ORDER BY price ${filter}
      `;
  const followers = await dal.execute(sql, [userId, destinationId]);
  return followers;
}

//Guest Vacations with Filters

async function getVacationsForGuestDateFilter(
  filter: string
): Promise<FollowersModel[]> {
  const sql = `
      SELECT DISTINCT
      V.*,
      DATE_FORMAT(V.startDate, '%d-%m-%Y %H:%i:%S') AS startDate,
      DATE_FORMAT(V.endDate, '%d-%m-%Y %H:%i:%S') AS endDate,
      COUNT(F.userId) AS followersCount
      FROM vacations AS V LEFT JOIN followers AS F
      ON V.vacationId = F.vacationId
      GROUP BY vacationId
      ORDER BY V.startDate ${filter}
      `;
  const followers = await dal.execute(sql);
  return followers;
}

async function getVacationsForGuestPriceFilter(
  filter: string
): Promise<FollowersModel[]> {
  const sql = `
      SELECT DISTINCT
      V.*,
      DATE_FORMAT(V.startDate, '%d-%m-%Y %H:%i:%S') AS startDate,
      DATE_FORMAT(V.endDate, '%d-%m-%Y %H:%i:%S') AS endDate,
      COUNT(F.userId) AS followersCount
      FROM vacations AS V LEFT JOIN followers AS F
      ON V.vacationId = F.vacationId
      GROUP BY vacationId
      ORDER BY price ${filter}
      `;
  const followers = await dal.execute(sql);
  return followers;
}

//All Vacations with Filters

async function getVacationsForUserDateFilter(
  userId: number,
  filter: string
): Promise<FollowersModel[]> {
  const sql = `
      SELECT DISTINCT
      V.*,
      DATE_FORMAT(V.startDate, '%d-%m-%Y %H:%i:%S') AS startDate,
      DATE_FORMAT(V.endDate, '%d-%m-%Y %H:%i:%S') AS endDate,
      EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
      COUNT(F.userId) AS followersCount
      FROM vacations AS V LEFT JOIN followers AS F
      ON V.vacationId = F.vacationId
      GROUP BY vacationId
      ORDER BY V.startDate ${filter}
      `;
  const followers = await dal.execute(sql, [userId]);
  return followers;
}

async function getVacationsForUserPriceFilter(
  userId: number,
  filter: string
): Promise<FollowersModel[]> {
  const sql = `
      SELECT DISTINCT
      V.*,
      DATE_FORMAT(V.startDate, '%d-%m-%Y %H:%i:%S') AS startDate,
      DATE_FORMAT(V.endDate, '%d-%m-%Y %H:%i:%S') AS endDate,
      EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
      COUNT(F.userId) AS followersCount
      FROM vacations AS V LEFT JOIN followers AS F
      ON V.vacationId = F.vacationId
      GROUP BY vacationId
      ORDER BY price ${filter}
      `;
  const followers = await dal.execute(sql, [userId]);
  return followers;
}

//Followed Vacations with Filters

async function getVacationsFollowedByUserDateFilter(
  userId: number,
  filter: string
): Promise<FollowersModel[]> {
  const sql = `
      SELECT DISTINCT
      V.*,
      DATE_FORMAT(V.startDate, '%d-%m-%Y %H:%i:%S') AS startDate,
      DATE_FORMAT(V.endDate, '%d-%m-%Y %H:%i:%S') AS endDate,
      EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
      COUNT(F.userId) AS followersCount
      FROM vacations AS V LEFT JOIN followers AS F
      ON V.vacationId = F.vacationId
      WHERE (F.userId = ?)
      GROUP BY vacationId
      ORDER BY V.startDate ${filter}
      `;
  const followers = await dal.execute(sql, [userId, userId]);
  return followers;
}

async function getVacationsFollowedByUserPriceFilter(
  userId: number,
  filter: string
): Promise<FollowersModel[]> {
  const sql = `
      SELECT DISTINCT
      V.*,
      DATE_FORMAT(V.startDate, '%d-%m-%Y %H:%i:%S') AS startDate,
      DATE_FORMAT(V.endDate, '%d-%m-%Y %H:%i:%S') AS endDate,
      EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
      COUNT(F.userId) AS followersCount
      FROM vacations AS V LEFT JOIN followers AS F
      ON V.vacationId = F.vacationId
      WHERE F.userId = ?
      GROUP BY vacationId
      ORDER BY price ${filter}
      `;
  const followers = await dal.execute(sql, [userId, userId]);
  return followers;
}

//All Vacation's and Destination's followers count

async function getAllVacationFollowersCount(): Promise<FollowersModel[]> {
  const sql = `
  SELECT DISTINCT
  V.vacationId,
  DATE_FORMAT(V.startDate, '%d-%m-%Y %H:%i:%S') AS startDate,
  DATE_FORMAT(V.endDate, '%d-%m-%Y %H:%i:%S') AS endDate,
  D.destinationName,
  COUNT(F.userId) AS followersCount
  FROM vacations AS V
  LEFT JOIN followers AS F
  ON V.vacationId = F.vacationId
  INNER JOIN destinations AS D ON V.destinationId = D.destinationId 
  GROUP BY vacationId
  ORDER BY V.destinationId
  `;
  const vacations = await dal.execute(sql);
  return vacations;
}

async function getAllDestinationFollowersCount(): Promise<FollowersModel[]> {
  const sql = `
  SELECT DISTINCT
  V.vacationId,
  D.destinationName,
  COUNT(F.userId) AS followersCount
  FROM vacations AS V
  LEFT JOIN followers AS F
  ON V.vacationId = F.vacationId
  INNER JOIN destinations AS D
  ON V.destinationId = D.destinationId 
  GROUP BY D.destinationId
  ORDER BY V.destinationId
  `;
  const vacations = await dal.execute(sql);
  return vacations;
}

// add new follower to DB
async function addFollower(follower: FollowersModel) {
  const err = follower.validate();
  if (err) throw new ValidationErrorModel(err);

  const sql = `
      INSERT INTO followers VALUES(?, ?)`;
  await dal.execute(sql, [follower.vacationId, follower.userId]);
}

// delete a follower from DB
async function deleteFollower(follower: FollowersModel) {
  const sql = `
      DELETE FROM followers WHERE vacationId = ? AND userId = ?`;
  const info: OkPacket = await dal.execute(sql, [
    follower.vacationId,
    follower.userId,
  ]);
  if (info.affectedRows === 0) throw new FollowerNotFoundErrorModel(follower);
}

export default {
  addFollower,
  deleteFollower,
  getVacationsForGuestDateFilter,
  getVacationsForGuestPriceFilter,
  getVacationsForUserDateFilter,
  getVacationsForUserPriceFilter,
  getVacationsForUserDestinationDateFilter,
  getVacationsForUserDestinationPriceFilter,
  getVacationsFollowedByUserDateFilter,
  getVacationsFollowedByUserPriceFilter,
  getAllVacationFollowersCount,
  getAllDestinationFollowersCount,
};
