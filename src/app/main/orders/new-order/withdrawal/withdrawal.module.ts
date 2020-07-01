import { NgModule } from '@angular/core';

import { WithdrawalComponent } from './withdrawal.component';
import { AppSharedModule } from '../../../../shared/shared.module';
import { WithdrawalRoutingModule } from './withdrawal-routing.module';

@NgModule({
  declarations: [WithdrawalComponent],
  imports: [AppSharedModule, WithdrawalRoutingModule],
})
export class WithdrawalModule {}
