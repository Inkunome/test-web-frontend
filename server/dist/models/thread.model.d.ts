import { Entity } from '@loopback/repository';
import { Message } from './message.model';
export declare class Thread extends Entity {
    descriptor: string;
    messages?: Message[];
    constructor(data?: Partial<Thread>);
}
