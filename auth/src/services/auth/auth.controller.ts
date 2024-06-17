import { IContainer, INext, IRequest, IResponse, IRouter } from '@itypes';
import { signInUserObject } from './dto';
import { validate } from '@utils';
import { readFile } from 'node:fs';
import { AppError, AuthError } from '@common';

class AuthController {
  public readonly controllerName = '/auth';
  constructor(
    private readonly router: IRouter,
    private readonly container: IContainer,
  ) {
    this.initRouting();
  }
  initRouting() {
    this.router.get(`${this.controllerName}/check`, this.check);
    this.router.post(
      `${this.controllerName}/sign-in`,
      validate(signInUserObject),
      this.signIn,
    );
  }
  check = (req: IRequest, res: IResponse) => {
    res.send('Works');
  };
  signIn = async (req: IRequest, res: IResponse, next: INext) => {
    try {
      throw new AuthError('asd111');
    } catch (error) {
      next(error);
      return;
    }

    res.send('Sign-in ok1');
  };
}

export default AuthController;
