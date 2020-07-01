import { NgModule } from '@angular/core';

import { SwitchAccountModalComponent } from './switch-account-modal.component';
import { AppSharedModule } from '../../shared.module';

@NgModule({
  declarations: [SwitchAccountModalComponent],
  imports: [AppSharedModule],
  exports: [SwitchAccountModalComponent],
  entryComponents: [SwitchAccountModalComponent],
})
export class SwitchAccountModalModule {}
