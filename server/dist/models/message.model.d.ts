import { Entity } from '@loopback/repository';
export declare class Message extends Entity {
    id: number;
    content: string;
    threadId: string;
    constructor(data?: Partial<Message>);
}
