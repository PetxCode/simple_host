import { NextFunction, Request, Response } from "express";
import { mainError } from "./mainError";
import { HTTP } from "../utils/enums";

const handerBuilder = (err: mainError, res: Response) => {
  return res.status(HTTP.BAD_RESPONSE).json({
    name: err.name,
    message: err.message,
    status: err.status,
    success: err.success,
  });
};

export const errorHandler = (
  err: mainError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return handerBuilder(err, res);
};
