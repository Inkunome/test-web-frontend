import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { Thread, Message } from '../models';
import { DbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { MessageRepository } from './message.repository';

export class ThreadRepository extends DefaultCrudRepository<
  Thread,
  typeof Thread.prototype.descriptor
  > {
  public readonly messages: HasManyRepositoryFactory<
    Message,
    typeof Thread.prototype.descriptor
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('OrderRepository')
    getMessageRepository: Getter<MessageRepository>,
  ) {
    super(Thread, dataSource);
    this.messages = this.createHasManyRepositoryFactoryFor(
      'messages',
      getMessageRepository,
    );
  }
}
