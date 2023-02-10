import express, { Request, Response, NextFunction } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import FollowersModel from "../4-models/followers-model";
import followersLogic from "../5-logic/followers-logic";

const router = express.Router();
//All Vacations with Filters
{
  // GET /api/followers-dateAsc/:userId
  router.get(
    "/followers-dateAsc/:userId",
    [verifyLoggedIn],
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "ASC";
        const userId = +request.params.userId;
        const vacations = await followersLogic.getVacationsForUserDateFilter(
          userId,
          filter
        );
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );

  // GET /api/followers-dateDesc/:userId
  router.get(
    "/followers-dateDesc/:userId",
    [verifyLoggedIn],
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "DESC";
        const userId = +request.params.userId;
        const vacations = await followersLogic.getVacationsForUserDateFilter(
          userId,
          filter
        );
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );

  // GET /api/followers-priceAsc/:userId
  router.get(
    "/followers-priceAsc/:userId",
    [verifyLoggedIn],
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "ASC";
        const userId = +request.params.userId;
        const vacations = await followersLogic.getVacationsForUserPriceFilter(
          userId,
          filter
        );
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );

  // GET /api/followers-priceDesc/:userId
  router.get(
    "/followers-priceDesc/:userId",
    [verifyLoggedIn],
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "DESC";
        const userId = +request.params.userId;
        const vacations = await followersLogic.getVacationsForUserPriceFilter(
          userId,
          filter
        );
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );
}
//Followed Vacations with Filters
{
  // GET /api/followed-dateAsc/:userId
  router.get(
    "/followed-dateAsc/:userId",
    [verifyLoggedIn],
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "ASC";
        const userId = +request.params.userId;
        const vacations =
          await followersLogic.getVacationsFollowedByUserDateFilter(
            userId,
            filter
          );
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );
  // GET /api/followed-dateDesc/:userId
  router.get(
    "/followed-dateDesc/:userId",
    [verifyLoggedIn],
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "DESC";
        const userId = +request.params.userId;
        const vacations =
          await followersLogic.getVacationsFollowedByUserDateFilter(
            userId,
            filter
          );
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );
  // GET /api/followed-priceAsc/:userId
  router.get(
    "/followed-priceAsc/:userId",
    [verifyLoggedIn],
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "ASC";
        const userId = +request.params.userId;
        const vacations =
          await followersLogic.getVacationsFollowedByUserPriceFilter(
            userId,
            filter
          );
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );
  // GET /api/followed-priceDesc/:userId
  router.get(
    "/followed-priceDesc/:userId",
    [verifyLoggedIn],
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "DESC";
        const userId = +request.params.userId;
        const vacations =
          await followersLogic.getVacationsFollowedByUserPriceFilter(
            userId,
            filter
          );
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );
}
//Guest Vacations with Filters
{
  // GET /api/followers-dateAsc/
  router.get(
    "/followers-dateAsc/",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "ASC";
        const vacations = await followersLogic.getVacationsForGuestDateFilter(
          filter
        );
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );
  // GET /api/followers-dateDesc/
  router.get(
    "/followers-dateDesc/",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "DESC";
        const vacations = await followersLogic.getVacationsForGuestDateFilter(
          filter
        );
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );
  // GET /api/followers-priceAsc/
  router.get(
    "/followers-priceAsc/",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "ASC";
        const vacations = await followersLogic.getVacationsForGuestPriceFilter(
          filter
        );
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );
  // GET /api/followers-priceDesc/
  router.get(
    "/followers-priceDesc/",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "DESC";
        const vacations = await followersLogic.getVacationsForGuestPriceFilter(
          filter
        );
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );
}
//Vacations by Destinations with Filters
{
  // GET /api/followers-dateAsc/:userId/destination/:destinationId
  router.get(
    "/followers-dateAsc/:userId/destination/:destinationId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "ASC";
        const destinationId = +request.params.destinationId;
        const userId = +request.params.userId;
        const vacations =
          await followersLogic.getVacationsForUserDestinationDateFilter({
            userId,
            destinationId,
            filter,
          });
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );

  // GET /api/followers-dateDesc/:userId/destination/:destinationId
  router.get(
    "/followers-dateDesc/:userId/destination/:destinationId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "DESC";
        const destinationId = +request.params.destinationId;
        const userId = +request.params.userId;
        const vacations =
          await followersLogic.getVacationsForUserDestinationDateFilter({
            userId,
            destinationId,
            filter,
          });
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );

  // GET /api/followers-priceAsc/:userId/destination/:destinationId
  router.get(
    "/followers-priceAsc/:userId/destination/:destinationId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "ASC";
        const destinationId = +request.params.destinationId;
        const userId = +request.params.userId;
        const vacations =
          await followersLogic.getVacationsForUserDestinationPriceFilter({
            userId,
            destinationId,
            filter,
          });
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );

  // GET /api/followers-priceDesc/:userId/destination/:destinationId
  router.get(
    "/followers-priceDesc/:userId/destination/:destinationId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const filter = "DESC";
        const destinationId = +request.params.destinationId;
        const userId = +request.params.userId;
        const vacations =
          await followersLogic.getVacationsForUserDestinationPriceFilter({
            userId,
            destinationId,
            filter,
          });
        response.json(vacations);
      } catch (err: any) {
        next(err);
      }
    }
  );
}
//Manage Followers
{
  // POST /api/followers
  router.post(
    "/followers",
    [verifyLoggedIn],
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const follower = new FollowersModel(request.body);
        const addedFollower = await followersLogic.addFollower(follower);
        response.json(addedFollower);
      } catch (err: any) {
        next(err);
      }
    }
  );

  // DELETE /api/followers
  router.delete(
    "/followers",
    [verifyLoggedIn],
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const follower = new FollowersModel(request.body);
        await followersLogic.deleteFollower(follower);
        response.sendStatus(204);
      } catch (err: any) {
        next(err);
      }
    }
  );
}

// GET Vacation's follower count
router.get(
  "/vacation-followers-count",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await followersLogic.getAllVacationFollowersCount();
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

// GET Destination's follower count
router.get(
  "/destination-followers-count",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await followersLogic.getAllDestinationFollowersCount();
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
