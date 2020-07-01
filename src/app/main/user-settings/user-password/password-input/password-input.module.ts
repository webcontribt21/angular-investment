import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../../shared/shared.module';

import { PasswordInputComponent } from './password-input.component';

@NgModule({
  declarations: [PasswordInputComponent],
  imports: [AppSharedModule],
  exports: [PasswordInputComponent],
})
export class PasswordInputModule {}
