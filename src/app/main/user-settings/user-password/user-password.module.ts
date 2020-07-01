import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../shared/shared.module';

import { UserPasswordComponent } from './user-password.component';
import { PasswordInputModule } from './password-input/password-input.module';

@NgModule({
  declarations: [UserPasswordComponent],
  imports: [AppSharedModule, PasswordInputModule],
  exports: [UserPasswordComponent],
})
export class UserPasswordModule {}
