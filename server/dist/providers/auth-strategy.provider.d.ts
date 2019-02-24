import { Provider, ValueOrPromise } from '@loopback/context';
import { AuthenticationMetadata, UserProfile } from '@loopback/authentication';
import { Strategy } from 'passport';
import { UserRepository } from '../repositories';
export declare class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
    private metadata;
    userRepository: UserRepository;
    constructor(metadata: AuthenticationMetadata, userRepository: UserRepository);
    value(): ValueOrPromise<Strategy | undefined>;
    verify(username: string, password: string, cb: (err: Error | null, user?: UserProfile | false) => void): void;
}
