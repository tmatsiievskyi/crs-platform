import { DiCore } from '@core';
import { AuthDi } from './auth/auth.di';
import { UsersDi } from './users/users.di';

class ModuleDi extends DiCore {
  register(): void {
    new AuthDi().register();
    new UsersDi().register();
  }
}

new ModuleDi().register();
