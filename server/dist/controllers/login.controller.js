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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
const authentication_1 = require("@loopback/authentication");
const rest_1 = require("@loopback/rest");
let LoginController = class LoginController {
    constructor(user) {
        this.user = user;
    }
    whoAmI() {
        return this.user.id;
    }
};
__decorate([
    authentication_1.authenticate('BasicStrategy'),
    rest_1.get('/whoami'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], LoginController.prototype, "whoAmI", null);
LoginController = __decorate([
    __param(0, context_1.inject(authentication_1.AuthenticationBindings.CURRENT_USER)),
    __metadata("design:paramtypes", [Object])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map