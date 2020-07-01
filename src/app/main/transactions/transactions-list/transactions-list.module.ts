import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../shared/shared.module';
import { TransactionsListComponent } from './transactions-list.component';

@NgModule({
  declarations: [TransactionsListComponent],
  imports: [AppSharedModule],
  exports: [TransactionsListComponent],
})
export class TransactionsListModule {}
