"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_cors_1 = __importDefault(require("koa-cors"));
const koa_route_1 = __importDefault(require("koa-route"));
const koa_passport_1 = __importDefault(require("koa-passport"));
const socket_io_1 = __importDefault(require("socket.io"));
const db_1 = require("./db");
require("./auth");
const app = new koa_1.default();
app.use(koa_cors_1.default());
app.use(koa_bodyparser_1.default());
app.use(koa_passport_1.default.initialize());
app.use(function (ctx, next) {
    return koa_passport_1.default.authenticate('basic', (err, user) => {
        if (user === false) {
            ctx.throw(401);
        }
        else {
            next();
        }
    })(ctx, next);
});
app.use(koa_route_1.default.get('/users', async (ctx) => {
    ctx.body = JSON.stringify(db_1.users);
}));
app.use(koa_route_1.default.get('/threads', async (ctx) => {
    ctx.body = JSON.stringify(db_1.threads);
}));
app.use(koa_route_1.default.get('/messages/:descriptor', async (ctx, descriptor) => {
    const result = [];
    for (const message of db_1.messages) {
        if (message.descriptor === descriptor) {
            result.push(message);
        }
    }
    ctx.body = JSON.stringify(result);
}));
app.use(koa_route_1.default.post('/messages/:descriptor', async (ctx, descriptor) => {
    const { content } = ctx.request.body;
    if (!content) {
        ctx.status = 400;
    }
    else {
        ctx.status = 201;
        const msg = {
            id: db_1.messages.length,
            descriptor,
            content
        };
        db_1.messages.push(msg);
        io.emit("new-message", msg);
    }
}));
const server = http_1.default.createServer(app.callback());
const io = socket_io_1.default(server);
server.listen(3000);
console.log('listening on port 3000');
