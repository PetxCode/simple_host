import { Application, NextFunction, Request, Response } from "express";
import agent from "./router/agentRouter";
import { mainError } from "./error/mainError";
import { HTTP } from "./utils/enums";
import { errorHandler } from "./error/errorHandler";
export const mainApp = async (app: Application) => {
  //   Agent routes
  app.use("/api/v1", agent);

  //   default API route

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Welcome to Cleaning API server",
      });
    } catch (error) {
      return res.status(404).json({
        message: "Error loading",
      });
    }
  });

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new mainError({
        name: "Route Error",
        message: `This: "${req.originalUrl}" is not a valid route`,
        status: HTTP.BAD_RESPONSE,
        success: false,
      })
    );
  });

  app.use(errorHandler);
};
