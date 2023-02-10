import express, { Request, Response, NextFunction } from "express";
import path from "path";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import DestinationModel from "../4-models/destination-model";
import destinationLogic from "../5-logic/destination-logic";

const router = express.Router();

// GET /api/destinations
router.get(
  "/destinations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const destinations = await destinationLogic.getAllDestinations();
      response.json(destinations);
    } catch (err: any) {
      next(err);
    }
  }
);

// GET /api/destinations/:id
router.get(
  "/destinations/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const destination = await destinationLogic.getOneDestination(id);
      response.json(destination);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST /api/destinations
router.post(
  "/destinations",
  [verifyAdmin],
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const destination = new DestinationModel(request.body);
      const addedDestination = await destinationLogic.addDestination(
        destination
      );
      response.status(201).json(addedDestination);
    } catch (err: any) {
      next(err);
    }
  }
);

// PUT /api/destinations
router.put(
  "/destinations",
  [verifyAdmin],
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const destination = new DestinationModel(request.body);
      const updatedDestination = await destinationLogic.updateDestination(
        destination
      );
      response.json(updatedDestination);
    } catch (err: any) {
      next(err);
    }
  }
);

// /api/destinations/2
router.delete(
  "/destinations/:id",
  [verifyAdmin],
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await destinationLogic.deleteDestination(id);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

// GET /api/destinations/images/imageName
router.get(
  "/destinations/images/:imageName",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const absolutePath = path.join(
        __dirname,
        "..",
        "1-assets",
        "images",
        imageName
      );
      response.sendFile(absolutePath);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
