import {
  IContainer,
  IController,
  INext,
  IRequest,
  IResponse,
  IRouter,
} from '@itypes';
import { SignUpUserDto, signInUserObject, signUpUserObject } from './dto';
import { validate } from '@utils';
import { AppError, AuthError } from '@common';
import { AuthService } from './auth.service';

class AuthController implements IController {
  public readonly controllerName = '/auth';
  private readonly authService = new AuthService();
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
    this.router.post(
      `${this.controllerName}/sign-up`,
      validate(signUpUserObject),
      this.signUp,
    );
  }
  check = async (req: IRequest, res: IResponse) => {
    try {
      const data = await this.container.data.db.raw('SELECT 1');
      res.json(data);
    } catch (err) {
      res.send('oops');
      console.log(err);
    }
  };
  signIn = async (req: IRequest, res: IResponse, next: INext) => {
    try {
      throw new AuthError('error');
    } catch (error) {
      next(error);
      return;
    }
  };
  signUp = async (req: IRequest, res: IResponse, next: INext) => {
    try {
      const reqData: SignUpUserDto = req.body;
      const data = await this.authService.register(reqData);
    } catch (error) {
      next(error);
    }
  };

  signOut = async () => {};

  lostPassword = async () => {};
}

export default AuthController;
