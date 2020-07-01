import { NgModule } from '@angular/core';

import { OrderSummaryComponent } from './order-summary.component';
import { AppSharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [OrderSummaryComponent],
  imports: [AppSharedModule],
  exports: [OrderSummaryComponent],
})
export class OrderSummaryModule {}
