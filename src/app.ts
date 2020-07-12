import Koa from "koa";
import bodyParser from 'koa-bodyparser'

import SetReqCtx from "~/middlewares/setReqCtx";
import RequestId from "~/middlewares/reqId";
import RequestLogger from '~/middlewares/reqLogger'
import PingResponder from '~/middlewares/pingResponder'

import router from "./router";

const app = new Koa();


// For health check calls from docker
app.use(PingResponder());

// Append request id to every request
// if one wasn't present in x-request-id header
app.use(RequestId());

// Will add source IP and request ID
// als, such that the same can be 
// used during orchestration, logging etc
app.use(SetReqCtx());

// Parses request body
app.use(bodyParser())

// Logs every request
app.use(RequestLogger());

// Main Application routes
app.use(router.routes()).use(router.allowedMethods());

// Handle 404
app.use((ctx) => {
  ctx.status = 404;
  ctx.body = 'Not found';
})

// TODO: Handle errors

export default app;
