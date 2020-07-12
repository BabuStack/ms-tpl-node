import {Middleware} from "koa";

/**
 * Ping Responder Middleware
 * 
 * Responds to ping calls from docker
 */
export default function PingResponder(): Middleware {
  return (ctx, next) => {
    if(ctx.path !== '/ping') {
      next();
      return;
    }
    
    ctx.status = 200;
    ctx.body = 'pong';
  };
}
