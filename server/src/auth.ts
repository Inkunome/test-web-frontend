import passport from "koa-passport";

import { BasicStrategy } from "passport-http";

import { IUser, users } from "./db";

passport.serializeUser(async (user: IUser, done) => {
  done(null, user.username)
})

passport.deserializeUser(async (id: string, done) => {
  let result: IUser | null = null;

  for (const user of users) {
    if (user.username === id) {
      result = user;
      break;
    }
  }

  if (result) {
    done(null, result)
  } else {
    done(new Error("Cannot found user to deserialize"));
  }
})

passport.use(new BasicStrategy((username, password, done) => {
  let result: IUser | null = null;

  for (const user of users) {
    if (username === user.username && password === user.password) {
      result = user;
      break;
    }
  }

  if (result) {
    done(null, result)
  } else {
    done(null, false);
  }
}));
