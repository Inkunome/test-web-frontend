import { inject } from '@loopback/context';
import {
  AuthenticationBindings,
  UserProfile,
  authenticate,
} from '@loopback/authentication';
import { get } from '@loopback/rest';

export class LoginController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER) private user: UserProfile,
  ) { }

  @authenticate('BasicStrategy')
  @get('/login')
  login(): string {
    try {
      return JSON.stringify(true);
    } catch {
      return JSON.stringify(false);
    }
  }
}
