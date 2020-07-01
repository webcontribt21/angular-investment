import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../shared/shared.module';

import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { AccountDetailsComponent } from './account-details.component';
import { PersonalInformationModule } from './personal-information/personal-information.module';
import { BankInformationModule } from './bank-information/bank-information.module';
import { TaxInformationModule } from './tax-information/tax-information.module';

@NgModule({
  declarations: [AccountDetailsComponent],
  imports: [AccountDetailsRoutingModule, AppSharedModule, PersonalInformationModule, BankInformationModule, TaxInformationModule],
})
export class AccountDetailsModule {}
