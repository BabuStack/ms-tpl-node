import app from "./app";
import Config from "./config";
import {serverLogger} from "~/lib/logger";
import AppInit from './init';

const ip = require("ip");



async function startServer() {
  try {
    await AppInit();
  } catch (error) {
    serverLogger.error('Failed during Application initialization:', error);
    return;
  }

  app.listen(Config.port, (err?: Error) => {
    if (err) {
      serverLogger.error("Failed to start server due to:", err);
    } else {
      serverLogger.info("App version:", Config.version);
      serverLogger.info("Node version:", process.version);
      serverLogger.info("Server running on:", `${ip.address()}:${Config.port}`);
    }
  });
}


startServer();