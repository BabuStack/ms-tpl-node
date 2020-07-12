import app from "./app";
import Config from "./config";
import logger from "~/lib/logger";
import AppInit from './init';

const ip = require("ip");

async function startServer() {
  try {
    await AppInit();
  } catch (error) {
    logger.error('Failed during Application initialization:', error);
    return;
  }

  app.listen(Config.port, (err?: Error) => {
    if (err) {
      logger.error("Failed to start server due to:", err);
    } else {
      logger.info("App version:", Config.version);
      logger.info("Node version:", process.version);
      logger.info("Server running on:", `${ip.address()}:${Config.port}`);
    }
  });
}


startServer();