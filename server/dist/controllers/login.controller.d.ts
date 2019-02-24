import { UserProfile } from '@loopback/authentication';
export declare class LoginController {
    private user;
    constructor(user: UserProfile);
    whoAmI(): string;
}
