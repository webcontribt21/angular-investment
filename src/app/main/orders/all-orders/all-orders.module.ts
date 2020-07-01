import { NgModule } from '@angular/core';

import { AllOrdersRoutingModule } from './all-orders-routing.module';
import { AllOrdersComponent } from './all-orders.component';
import { AppSharedModule } from '../../../shared/shared.module';
import { OrdersListModule } from './orders-list/orders-list.module';
import { OrdersInfoModule } from './orders-info/orders-info.module';

@NgModule({
  declarations: [AllOrdersComponent],
  imports: [AppSharedModule, AllOrdersRoutingModule, OrdersListModule, OrdersInfoModule],
})
export class AllOrdersModule {}
