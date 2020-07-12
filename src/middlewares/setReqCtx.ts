const als = require("async-local-storage");
const requestIp = require("request-ip");
import {Middleware} from "koa";
import ICtxState from "~/interfaces/ctxState";

// Enable/Initialize als
als.enable();

/**
 * Will set request ctx(context) by add
 * requestId to als
 * 
 * Note: the same reqId & reqIP is being used
 * in lib/logger which will be used during 
 * each and every log in the application
 */
export default function SetReqCtx(): Middleware<ICtxState> {
  return (ctx, next) => {
    als.scope();
    als.set("reqId", ctx.state.reqId);
    als.set("reqIP", requestIp.getClientIp(ctx.req));

    next();
  };
}
