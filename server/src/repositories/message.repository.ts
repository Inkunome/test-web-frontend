import {DefaultCrudRepository} from '@loopback/repository';
import {Message} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MessageRepository extends DefaultCrudRepository<
  Message,
  typeof Message.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Message, dataSource);
  }
}
