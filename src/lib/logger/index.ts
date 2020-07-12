const als = require("async-local-storage");
import Logler from "logler";

export const getLoggerOptions = () => ({
  colorLogs: true,
  tokens   : {
    reqId: () => als.get("reqId") ?? '',
    reqIP: () => als.get("reqIP") ?? '',
  },
  formatter: (tokens: any, level: any, msg: string) => `${tokens.timestamp} [${level.toUpperCase()}] ${tokens.reqId} <${tokens.fileName}:${tokens.lineNum}> ${msg}`,
})

export const getFormatter = (cb: any) => {
  return (tokens: any, level: any, msg: string) => `${tokens.timestamp} [${level.toUpperCase()}] ${tokens.reqId} ${cb(tokens)} ${msg}`
}

export const getLogger = (logOptions: any) => {
  return new Logler(logOptions)
}

const logger = getLogger(getLoggerOptions());
export default logger;