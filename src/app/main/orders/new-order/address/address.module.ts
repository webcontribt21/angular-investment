import { NgModule } from '@angular/core';

import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { AppSharedModule } from '../../../../shared/shared.module';
import { AddressFormModule } from './address-form/address-form.module';
import { MakeOrderModule } from './make-order/make-order.module';
import { AddressSummaryModule } from './address-summary/address-summary.module';

@NgModule({
  declarations: [AddressComponent],
  imports: [AppSharedModule, AddressRoutingModule, AddressFormModule, MakeOrderModule, AddressSummaryModule],
})
export class AddressModule {}
