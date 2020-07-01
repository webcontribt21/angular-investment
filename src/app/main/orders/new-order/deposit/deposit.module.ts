import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../../shared/shared.module';

import { DepositRoutingModule } from './deposit-routing.module';
import { DepositComponent } from './deposit.component';

@NgModule({
  declarations: [DepositComponent],
  imports: [AppSharedModule, DepositRoutingModule],
})
export class DepositModule {}
