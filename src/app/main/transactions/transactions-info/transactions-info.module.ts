import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../shared/shared.module';

import { TransactionsInfoComponent } from './transactions-info.component';

@NgModule({
  declarations: [TransactionsInfoComponent],
  imports: [AppSharedModule],
  exports: [TransactionsInfoComponent],
})
export class TransactionsInfoModule {}
