import { NgModule } from '@angular/core';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { AppSharedModule } from '../../shared/shared.module';
import { TransactionsInfoModule } from './transactions-info/transactions-info.module';
import { TransactionsListModule } from './transactions-list/transactions-list.module';

@NgModule({
  declarations: [TransactionsComponent],
  imports: [TransactionsRoutingModule, AppSharedModule, TransactionsInfoModule, TransactionsListModule],
  providers: [],
})
export class TransactionsModule {}
