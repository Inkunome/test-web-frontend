import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Thread } from './thread.model';

@model()
export class Message extends Entity {
  @property({
    id: true,
    description: 'The unique identifier for a product',
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @belongsTo(() => Thread)
  threadId: string;

  constructor(data?: Partial<Message>) {
    super(data);
  }
}
