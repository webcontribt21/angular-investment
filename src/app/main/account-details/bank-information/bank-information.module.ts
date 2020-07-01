import { NgModule } from '@angular/core';

import { BankInformationComponent } from './bank-information.component';
import { AppSharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [BankInformationComponent],
  imports: [AppSharedModule],
  exports: [BankInformationComponent],
  providers: [],
})
export class BankInformationModule {}
