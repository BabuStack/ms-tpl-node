import {Middleware} from "koa";
import ICtxState from "~/interfaces/ctxState";
import {reqLogger, resLogger, apiLogger} from '~/lib/logger'

/**
 * Logs every request
 */
export default function RequestLogger(): Middleware<ICtxState> {
  return async (ctx, next) => {
    const start = Date.now();
    reqLogger.info(ctx.request.headers);
    reqLogger.info(ctx.request.body);

    await next();
    
    const duration = Date.now() - start;
    apiLogger.info(`${ctx.method} ${ctx.URL} - ${duration}ms`)
    resLogger.info(ctx.status);
    resLogger.info(ctx.response.header);
    resLogger.info(ctx.body);
  };
}
