import { Count, Filter, Where } from '@loopback/repository';
import { Thread, Message } from '../models';
import { ThreadRepository } from '../repositories';
export declare class ThreadController {
    threadRepository: ThreadRepository;
    constructor(threadRepository: ThreadRepository);
    create(thread: Thread): Promise<Thread>;
    createMessage(threadId: typeof Thread.prototype.descriptor, messageData: Message): Promise<Message>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Thread[]>;
    updateAll(thread: Thread, where?: Where): Promise<Count>;
    findById(id: string): Promise<Thread>;
    updateById(id: string, thread: Thread): Promise<void>;
    replaceById(id: string, thread: Thread): Promise<void>;
    deleteById(id: string): Promise<void>;
}
