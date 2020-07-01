import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../shared/shared.module';

import { AccountActivityComponent } from './account-activity.component';

@NgModule({
  declarations: [AccountActivityComponent],
  imports: [AppSharedModule],
  exports: [AccountActivityComponent],
})
export class AccountActivityModule {}
