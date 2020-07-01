import { NgModule } from '@angular/core';

import { ReferenceAccountSummaryComponent } from './reference-account-summary.component';
import { AppSharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [ReferenceAccountSummaryComponent],
  imports: [AppSharedModule],
  exports: [ReferenceAccountSummaryComponent],
})
export class ReferenceAccountSummaryModule {}
