"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const thread_model_1 = require("./thread.model");
let Message = class Message extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        id: true,
        description: 'The unique identifier for a product',
    }),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    repository_1.belongsTo(() => thread_model_1.Thread),
    __metadata("design:type", String)
], Message.prototype, "threadId", void 0);
Message = __decorate([
    repository_1.model(),
    __metadata("design:paramtypes", [Object])
], Message);
exports.Message = Message;
//# sourceMappingURL=message.model.js.map