import { SignUpUserDto } from './dto';

export class AuthService {
  public register(signUpData: SignUpUserDto) {}

  private async logUserIn(user: any) {
    return await 'asd';
  } //TODO: user type
}
