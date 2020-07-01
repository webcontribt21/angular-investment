import { NgModule } from '@angular/core';

import { AddressSummaryComponent } from './address-summary.component';
import { AppSharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [AddressSummaryComponent],
  imports: [AppSharedModule],
  exports: [AddressSummaryComponent],
})
export class AddressSummaryModule {}
