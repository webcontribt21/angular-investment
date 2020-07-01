import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { AppSharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [OrdersComponent],
  imports: [OrdersRoutingModule, AppSharedModule],
  providers: [],
})
export class OrdersModule {}
