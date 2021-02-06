// tslint:disable-next-line: no-var-requires
require("dotenv-safe").config();
import express from "express";
import path from "path";
import "reflect-metadata";
import { Logger } from "./util/logger.util";

const logger: Logger = new Logger(path.basename(__filename));
const port: number = Number(process.env.SERVER_PORT);

/**
 * Main method to start the server.
 */
export const run = async () => {
  try {
    const app = express();
    const http = require("http").Server(app);
    const io = require("socket.io")(http, { origins: "*:*" });

    io.on("connection", function (socket: any) {
      logger.log("Connection from user successfully established.");

      /* redirect data to all clients */
      socket.on("booking", (arg: any) => {
        logger.log(arg);
        io.sockets.emit("booking", arg);
      });

      /* redirect data to all clients */
      socket.on("stopBooking", (arg: any) => {
        logger.log(arg);
        io.sockets.emit("stopBooking", arg);
      });
    });

    http.listen(port, function () {
      logger.log(`Socket is now listening on http://localhost:${port}`);
    });
  } catch (error) {
    logger.log(`${error}`);
  }
};

// tslint:disable-next-line: no-floating-promises
run();
