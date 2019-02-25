import { Entity, model, property, hasMany } from '@loopback/repository';

import { Message } from './message.model';

@model()
export class Thread extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  descriptor: string;

  @hasMany(() => Message)
  messages?: Message[];

  constructor(data?: Partial<Thread>) {
    super(data);
  }
}
