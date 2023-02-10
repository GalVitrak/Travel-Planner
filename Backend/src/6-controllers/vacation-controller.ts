import express, { Request, Response, NextFunction } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import VacationModel from "../4-models/vacation-model";
import vacationLogic from "../5-logic/vacation-logic";
import logic from "../5-logic/vacation-logic";

const router = express.Router();

// GET /api/vacations/:id
router.get(
  "/vacations/:id",
  [verifyLoggedIn],
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const vacation = await vacationLogic.getOneVacation(id);
      response.json(vacation);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST /api/vacations
router.post(
  "/vacations",
  [verifyAdmin],
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacation = new VacationModel(request.body);
      const addedVacation = await vacationLogic.addVacation(vacation);
      response.status(201).json(addedVacation);
    } catch (err: any) {
      next(err);
    }
  }
);

// PUT /api/vacations
router.put(
  "/vacations",
  [verifyAdmin],
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacation = new VacationModel(request.body);
      const updatedVacation = await vacationLogic.updateVacation(vacation);
      response.json(updatedVacation);
    } catch (err: any) {
      next(err);
    }
  }
);

// DELETE /api/vacations/
router.delete(
  "/vacations/:id",
  [verifyAdmin],
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await vacationLogic.deleteVacation(id);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
