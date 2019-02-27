import http from "http";

import Koa, { Context } from "koa";

import bodyParser from "koa-bodyparser";
import cors from "koa-cors";
import route from "koa-route";
import passport from "koa-passport";

import socket from "socket.io";

import { users, threads, messages } from "./db";

import "./auth";

const app: Koa = new Koa();

app.use(cors());
app.use(bodyParser());

app.use(passport.initialize());

app.use(function(ctx, next) {
  return passport.authenticate('basic', (err, user) => {
    if (user === false) {
      ctx.throw(401)
    } else {
      next();
    }
  })(ctx, next)
});

app.use(route.get('/users', async (ctx: Context) => {
  ctx.body = JSON.stringify(users);
}));

app.use(route.get('/threads', async (ctx: Context) => {
  ctx.body = JSON.stringify(threads);
}));

app.use(route.get('/messages/:descriptor', async (ctx: Context, descriptor: string) => {
  const result = [];

  for (const message of messages) {
    if (message.descriptor === descriptor) {
      result.push(message);
    }
  }

  ctx.body = JSON.stringify(result);
}));

app.use(route.post('/messages/:descriptor', async (ctx: Context, descriptor: string) => {
  const { content } = ctx.request.body;

  if (!content) {
    ctx.status = 400;
  } else {
    ctx.status = 201;
    const msg = {
      id: messages.length,
      descriptor,
      content
    }

    messages.push(msg)
    io.emit("new-message", msg);
  }
}));

const server = http.createServer(app.callback());
const io = socket(server);

server.listen(3000);
console.log('listening on port 3000');