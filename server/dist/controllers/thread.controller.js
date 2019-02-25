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
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const authentication_1 = require("@loopback/authentication");
let ThreadController = class ThreadController {
    constructor(threadRepository) {
        this.threadRepository = threadRepository;
    }
    async create(thread) {
        return await this.threadRepository.create(thread);
    }
    async createMessage(threadId, messageData) {
        return await this.threadRepository.messages(threadId).create(messageData);
    }
    async count(where) {
        return await this.threadRepository.count(where);
    }
    async find(filter) {
        return await this.threadRepository.find(filter);
    }
    async updateAll(thread, where) {
        return await this.threadRepository.updateAll(thread, where);
    }
    async findById(id) {
        return await this.threadRepository.findById(id);
    }
    async updateById(id, thread) {
        await this.threadRepository.updateById(id, thread);
    }
    async replaceById(id, thread) {
        await this.threadRepository.replaceById(id, thread);
    }
    async deleteById(id) {
        await this.threadRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/threads', {
        responses: {
            '200': {
                description: 'Thread model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Thread } } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Thread]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "create", null);
__decorate([
    rest_1.post('/threads/{id}/message'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, models_1.Message]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "createMessage", null);
__decorate([
    rest_1.get('/threads/count', {
        responses: {
            '200': {
                description: 'Thread model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Thread))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "count", null);
__decorate([
    authentication_1.authenticate("BasicStrategy"),
    rest_1.get('/threads', {
        responses: {
            '200': {
                description: 'Array of Thread model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Thread } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Thread))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "find", null);
__decorate([
    rest_1.patch('/threads', {
        responses: {
            '200': {
                description: 'Thread PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Thread))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Thread, Object]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/threads/{id}', {
        responses: {
            '200': {
                description: 'Thread model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Thread } } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "findById", null);
__decorate([
    rest_1.patch('/threads/{id}', {
        responses: {
            '204': {
                description: 'Thread PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Thread]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "updateById", null);
__decorate([
    rest_1.put('/threads/{id}', {
        responses: {
            '204': {
                description: 'Thread PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Thread]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/threads/{id}', {
        responses: {
            '204': {
                description: 'Thread DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "deleteById", null);
ThreadController = __decorate([
    __param(0, repository_1.repository(repositories_1.ThreadRepository)),
    __metadata("design:paramtypes", [repositories_1.ThreadRepository])
], ThreadController);
exports.ThreadController = ThreadController;
//# sourceMappingURL=thread.controller.js.map