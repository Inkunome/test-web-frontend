"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_passport_1 = __importDefault(require("koa-passport"));
const passport_http_1 = require("passport-http");
const db_1 = require("./db");
koa_passport_1.default.serializeUser(async (user, done) => {
    done(null, user.username);
});
koa_passport_1.default.deserializeUser(async (id, done) => {
    let result = null;
    for (const user of db_1.users) {
        if (user.username === id) {
            result = user;
            break;
        }
    }
    if (result) {
        done(null, result);
    }
    else {
        done(new Error("Cannot found user to deserialize"));
    }
});
koa_passport_1.default.use(new passport_http_1.BasicStrategy((username, password, done) => {
    let result = null;
    for (const user of db_1.users) {
        if (username === user.username && password === user.password) {
            result = user;
            break;
        }
    }
    if (result) {
        done(null, result);
    }
    else {
        done(null, false);
    }
}));
