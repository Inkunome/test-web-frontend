import { DefaultCrudRepository } from '@loopback/repository';
import { Message } from '../models';
import { DbDataSource } from '../datasources';
export declare class MessageRepository extends DefaultCrudRepository<Message, typeof Message.prototype.id> {
    constructor(dataSource: DbDataSource);
}
