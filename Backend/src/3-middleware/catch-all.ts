import { NextFunction, Request, Response } from "express";
import appConfig from "../2-utils/app-config";
import logger from "../2-utils/logger";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {

    console.log(err);

    const status = err.status || 500;

    // Always log server errors: 
    if(status === 500) {
        logger.logError("catchAll error", err);
    }

    // Return original error only on development:
    const message = appConfig.isDevelopment || status !== 500 ? err.message : "Some error occurred, please try again";

    response.status(status).send(message);
}

export default catchAll;
