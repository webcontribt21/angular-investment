import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../shared/shared.module';

import { UserEmailComponent } from './user-email.component';

@NgModule({
  declarations: [UserEmailComponent],
  imports: [AppSharedModule],
  exports: [UserEmailComponent],
})
export class UserEmailModule {}
