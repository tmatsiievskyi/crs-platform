import { IContainer, INext, IRequest, IResponse, IRouter } from '@itypes';
import { signInUserObject } from './dto';
import { validate } from '@utils';
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
  check = async (req: IRequest, res: IResponse) => {
    try {
      const data = await this.container.data.db.raw('SELECT 1');
      res.send('Works!!!');
    } catch (err) {
      res.send('oops');
      console.log(err);
    }
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
