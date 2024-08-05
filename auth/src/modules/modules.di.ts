import { DiCore } from '@core';
import { AuthDi } from './auth/auth.di';
import { UsersDi } from './users/users.di';
import { RefreshTokenDi } from './refreshToken/refreshToken.di';

class ModuleDi extends DiCore {
  register(): void {
    new AuthDi().register();
    new UsersDi().register();
    new RefreshTokenDi().register();
  }
}

new ModuleDi().register();
