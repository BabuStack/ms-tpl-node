import {Middleware} from "koa";
import {v4 as uuidv4} from "uuid";
import ICtxState from "~/interfaces/ctxState";

/**
 * Request Id Middleware
 *
 * Adds timestamp based uuid to req.id
 * and adds the same to response header (x-request-id)
 */
export default function RequestId(): Middleware<ICtxState> {
  return (ctx, next) => {
    ctx.state.reqId = ctx.get("x-request-id") || uuidv4();
    ctx.set("x-request-id", ctx.state.reqId);

    next();
  };
}
