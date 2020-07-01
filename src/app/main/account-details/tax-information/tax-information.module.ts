import { NgModule } from '@angular/core';

import { TaxInformationComponent } from './tax-information.component';
import { AppSharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [TaxInformationComponent],
  imports: [AppSharedModule],
  exports: [TaxInformationComponent],
  providers: [],
})
export class TaxInformationModule {}
