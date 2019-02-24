import { Provider, inject, ValueOrPromise } from '@loopback/context';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import { repository } from '@loopback/repository';

import { Strategy } from 'passport';
import { BasicStrategy } from 'passport-http';

import { User } from '../models';
import { UserRepository } from '../repositories';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(UserRepository)
    public userRepository: UserRepository
  ) { }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify.bind(this));
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  verify(username: string,
    password: string,
    cb: (err: Error | null, user?: UserProfile | false) => void) {
    this.userRepository.findById(username).then((user: User) => {
      // Why encrypt? :)
      if (user.password === password) {
        cb(null, { id: username });
      } else {
        cb(null, false);
      }
    }).catch((err: Error) => {
      cb(err, false);
    });
  }
}
