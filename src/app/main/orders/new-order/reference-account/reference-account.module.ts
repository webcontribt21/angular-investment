import { NgModule } from '@angular/core';

import { ReferenceAccountRoutingModule } from './reference-account-routing.module';
import { ReferenceAccountComponent } from './reference-account.component';
import { AppSharedModule } from '../../../../shared/shared.module';
import { ReferenceAccountFormModule } from './reference-account-form/reference-account-form.module';
import { MakeOrderModule } from './make-order/make-order.module';
import { ReferenceAccountSummaryModule } from './reference-account-summary/reference-account-summary.module';

@NgModule({
  declarations: [ReferenceAccountComponent],
  imports: [AppSharedModule, ReferenceAccountRoutingModule, ReferenceAccountFormModule, MakeOrderModule, ReferenceAccountSummaryModule],
})
export class ReferenceAccountModule {}
