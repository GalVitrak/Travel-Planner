import dal from "../2-utils/dal";
import {
  ResourceNotFoundErrorModel,
  ValidationErrorModel,
} from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import { OkPacket } from "mysql";

// gets one vacation from DB
async function getOneVacation(id: number): Promise<VacationModel> {
  const sql = `
      SELECT DISTINCT
      V.*,
      DATE_FORMAT(V.startDate, '%d-%m-%Y %H:%i:%S') AS startDate,
      DATE_FORMAT(V.endDate, '%d-%m-%Y %H:%i:%S') AS endDate,
      COUNT(F.userId) AS followersCount
      FROM vacations AS V LEFT JOIN followers AS F
      ON V.vacationId = F.vacationId
      WHERE V.vacationId = ?
        `;
  const vacation = await dal.execute(sql, [id]);
  return vacation[0];
}

// adds a vacation to DB
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
  const err = vacation.validate();
  if (err) throw new ValidationErrorModel(err);

  const sql = `
    INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?)`;
  const info: OkPacket = await dal.execute(sql, [
    vacation.destinationId,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
  ]);
  vacation.vacationId = info.insertId;
  return vacation;
}

// updates a vacation in DB
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
  const err = vacation.validate();
  if (err) throw new ValidationErrorModel(err);

  const sql = `
      UPDATE vacations SET
      destinationId  = ?,
      startDate = ?,
      endDate = ?,
      price = ?
      WHERE vacationId  = ?`;

  const info: OkPacket = await dal.execute(sql, [
    vacation.destinationId,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.vacationId,
  ]);
  if (info.affectedRows === 0)
    throw new ResourceNotFoundErrorModel(vacation.vacationId);
  return vacation;
}

// deletes a vacation from DB
async function deleteVacation(id: number) {
  const deleteSql = `DELETE FROM vacations WHERE vacationId = ?`;
  const info: OkPacket = await dal.execute(deleteSql, [id]);
  if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id);
}

export default {
  getOneVacation,
  addVacation,
  updateVacation,
  deleteVacation,
};
