import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Thread, Message } from '../models';
import { ThreadRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';

export class ThreadController {
  constructor(
    @repository(ThreadRepository)
    public threadRepository: ThreadRepository,
  ) { }

  @post('/threads', {
    responses: {
      '200': {
        description: 'Thread model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Thread } } },
      },
    },
  })
  async create(@requestBody() thread: Thread): Promise<Thread> {
    return await this.threadRepository.create(thread);
  }

  @post('/threads/{id}/message')
  async createMessage(
    @param.path.number('id') threadId: typeof Thread.prototype.descriptor,
    @requestBody() messageData: Message,
  ): Promise<Message> {
    return await this.threadRepository.messages(threadId).create(messageData);
  }

  @get('/threads/count', {
    responses: {
      '200': {
        description: 'Thread model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Thread)) where?: Where,
  ): Promise<Count> {
    return await this.threadRepository.count(where);
  }

  @authenticate("BasicStrategy")
  @get('/threads', {
    responses: {
      '200': {
        description: 'Array of Thread model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Thread } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Thread)) filter?: Filter,
  ): Promise<Thread[]> {
    return await this.threadRepository.find(filter);
  }

  @patch('/threads', {
    responses: {
      '200': {
        description: 'Thread PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() thread: Thread,
    @param.query.object('where', getWhereSchemaFor(Thread)) where?: Where,
  ): Promise<Count> {
    return await this.threadRepository.updateAll(thread, where);
  }

  @get('/threads/{id}', {
    responses: {
      '200': {
        description: 'Thread model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Thread } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Thread> {
    return await this.threadRepository.findById(id);
  }

  @patch('/threads/{id}', {
    responses: {
      '204': {
        description: 'Thread PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() thread: Thread,
  ): Promise<void> {
    await this.threadRepository.updateById(id, thread);
  }

  @put('/threads/{id}', {
    responses: {
      '204': {
        description: 'Thread PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() thread: Thread,
  ): Promise<void> {
    await this.threadRepository.replaceById(id, thread);
  }

  @del('/threads/{id}', {
    responses: {
      '204': {
        description: 'Thread DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.threadRepository.deleteById(id);
  }
}
