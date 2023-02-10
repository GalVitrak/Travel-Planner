import { NextFunction, Request, Response } from "express";

function logRequest(request: Request, response: Response, next: NextFunction) {
  console.log(
    `Request Method: ${request.method}, Request Route: ${request.originalUrl}`
  );
  next();
}

export default logRequest;
