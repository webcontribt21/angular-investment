import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../../shared/shared.module';

import { OrdersListComponent } from './orders-list.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [OrdersListComponent, OrderComponent],
  imports: [AppSharedModule],
  exports: [OrdersListComponent],
})
export class OrdersListModule {}
