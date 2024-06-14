import express, { Application } from "express";
import cors from "cors";
import { PORT } from "./utils/constant";
import { IncomingMessage, ServerResponse, Server } from "node:http";
import { dbConfig } from "./utils/dbConfig";
import { mainApp } from "./mainApp";
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

mainApp(app);

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
  app.listen(PORT, () => {
    console.clear();
    dbConfig();
  });

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException: ", error);

  process.exit(1);
});
process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);
  server.close(() => {
    process.exit(1);
  });
});
