import { Count, Filter, Where } from '@loopback/repository';
import { Message } from '../models';
import { MessageRepository } from '../repositories';
export declare class MessageController {
    messageRepository: MessageRepository;
    constructor(messageRepository: MessageRepository);
    create(message: Message): Promise<Message>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Message[]>;
    updateAll(message: Message, where?: Where): Promise<Count>;
    findById(id: number): Promise<Message>;
    updateById(id: number, message: Message): Promise<void>;
    replaceById(id: number, message: Message): Promise<void>;
    deleteById(id: number): Promise<void>;
}
