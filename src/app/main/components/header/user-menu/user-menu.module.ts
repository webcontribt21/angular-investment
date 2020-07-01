import { NgModule } from '@angular/core';

import { UserMenuComponent } from './user-menu.component';
import { AppSharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [UserMenuComponent],
  imports: [AppSharedModule],
  exports: [UserMenuComponent],
  providers: [],
})
export class UserMenuModule {}
