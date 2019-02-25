"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_cors_1 = __importDefault(require("koa-cors"));
const koa_route_1 = __importDefault(require("koa-route"));
const koa_session_1 = __importDefault(require("koa-session"));
const koa_passport_1 = __importDefault(require("koa-passport"));
const db_1 = require("./db");
require("./auth");
const app = new koa_1.default();
app.use(koa_cors_1.default());
app.use(koa_bodyparser_1.default());
// Sessions
app.keys = ['hello'];
app.use(koa_session_1.default({}, app));
app.use(koa_passport_1.default.initialize());
app.use(koa_passport_1.default.session());
app.use(function (ctx, next) {
    return koa_passport_1.default.authenticate('basic', (err, user) => {
        if (user === false) {
            ctx.body = { success: false };
            ctx.throw(401);
        }
        else {
            ctx.body = { success: true };
            ctx.login(user);
        }
    })(ctx, next);
});
app.use(koa_route_1.default.get('/users', async (ctx) => {
    ctx.body = JSON.stringify(db_1.users);
}));
app.use(koa_route_1.default.get('/pets/:name', async (ctx) => {
    return JSON.stringify(db_1.users);
}));
app.listen(3000);
console.log('listening on port 3000');
