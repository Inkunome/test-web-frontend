import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    username: string;
    password: string;
    constructor(data?: Partial<User>);
}
