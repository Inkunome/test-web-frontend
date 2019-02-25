import Koa, { Context } from "koa";

import bodyParser from "koa-bodyparser";
import cors from "koa-cors";
import route from "koa-route";
import session from "koa-session";
import passport from "koa-passport";

import { users } from "./db";

import "./auth";

const app: Koa = new Koa();

app.use(cors());
app.use(bodyParser());

// Sessions
app.keys = ['hello'];
app.use(session({}, app));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(ctx, next) {
  return passport.authenticate('basic', (err, user) => {
    if (user === false) {
      ctx.body = { success: false }
      ctx.throw(401)
    } else {
      ctx.body = { success: true }
      ctx.login(user)
    }
  })(ctx, next)
})

app.use(route.get('/users', async (ctx: Context) => {
  ctx.body = JSON.stringify(users);
}));

app.use(route.get('/pets/:name', async (ctx: Context) => {
  return JSON.stringify(users);
}));

app.listen(3000);
console.log('listening on port 3000');