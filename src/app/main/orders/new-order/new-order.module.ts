import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../shared/shared.module';
import { BackButtonModule } from '../../../shared/modules/back-button/back-button.module';

import { NewOrderRoutingModule } from './new-order-routing.module';
import { NewOrderComponent } from './new-order.component';

@NgModule({
  declarations: [NewOrderComponent],
  imports: [AppSharedModule, NewOrderRoutingModule, BackButtonModule],
})
export class NewOrderModule {}
