import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Thread, Message } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { MessageRepository } from './message.repository';
export declare class ThreadRepository extends DefaultCrudRepository<Thread, typeof Thread.prototype.descriptor> {
    readonly messages: HasManyRepositoryFactory<Message, typeof Thread.prototype.descriptor>;
    constructor(dataSource: DbDataSource, getMessageRepository: Getter<MessageRepository>);
}
