import { DiCore } from '@core';
import { AuthDi } from './auth/auth.di';

class ModuleDi extends DiCore {
  register(): void {
    new AuthDi().register();
  }
}

new ModuleDi().register();
