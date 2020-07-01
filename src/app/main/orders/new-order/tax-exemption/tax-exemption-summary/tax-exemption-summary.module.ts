import { NgModule } from '@angular/core';

import { TaxExemptionSummaryComponent } from './tax-exemption-summary.component';
import { AppSharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [TaxExemptionSummaryComponent],
  imports: [AppSharedModule],
  exports: [TaxExemptionSummaryComponent],
})
export class TaxExemptionSummaryModule {}
