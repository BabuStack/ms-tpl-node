const als = require("async-local-storage");
import Logler from "logler";
import {v4 as uuidv4} from "uuid";

/**
 * Unique ID for this server
 * 
 * This will be useful during debugging to 
 * find out which server instance does the 
 * particular log entry belong to.
 */
const instanceID = uuidv4();


/******************
 * UTILS
 ******************/
const getLoggerOptions = () => ({
  colorLogs: true,
  tokens   : {
    reqId: () => als.get("reqId") ?? '',
    reqIP: () => als.get("reqIP") ?? '',
  },
  formatter: (tokens: any, level: any, msg: string) => `${tokens.timestamp} [${level.toUpperCase()}] ${tokens.reqId} <${tokens.fileName}:${tokens.lineNum}> ${msg}`,
})

const getFormatter = (cb: any) => {
  return (tokens: any, level: any, msg: string) => `${tokens.timestamp} [${level.toUpperCase()}] ${tokens.reqId} ${cb(tokens)} ${msg}`
}

const getLogger = (logOptions: any) => {
  return new Logler(logOptions)
}

function getModuleLogger(prefix = '') {
  return getLogger({
    ...getLoggerOptions(),
    formatter: getFormatter(() => prefix)
  })
}


/***************
 * LOGGERS
 **************/

export const reqLogger = getModuleLogger('<--')
export const resLogger = getModuleLogger('-->')

export const serverLogger = getModuleLogger(instanceID);
export const apiLogger = getLogger({
  ...getLoggerOptions(),
  formatter: getFormatter(
    (tokens: any) => `${instanceID} ${tokens.reqIP}`
  )
});


const logger = getLogger(getLoggerOptions());
export default logger;