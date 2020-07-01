import { NgModule } from '@angular/core';

import { OrdersInfoComponent } from './orders-info.component';
import { AppSharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [OrdersInfoComponent],
  imports: [AppSharedModule],
  exports: [OrdersInfoComponent],
})
export class OrdersInfoModule {}
