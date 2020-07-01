import { NgModule } from '@angular/core';

import { TaxExemptionRoutingModule } from './tax-exemption-routing.module';
import { TaxExemptionComponent } from './tax-exemption.component';
import { AppSharedModule } from '../../../../shared/shared.module';
import { TaxExemptionFormModule } from './tax-exemption-form/tax-exemption-form.module';
import { MakeOrderModule } from './make-order/make-order.module';
import { TaxExemptionSummaryModule } from './tax-exemption-summary/tax-exemption-summary.module';

@NgModule({
  declarations: [TaxExemptionComponent],
  imports: [AppSharedModule, TaxExemptionRoutingModule, TaxExemptionFormModule, MakeOrderModule, TaxExemptionSummaryModule],
})
export class TaxExemptionModule {}
