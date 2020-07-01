import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsComponent } from './transactions.component';
import { TransactionsResolver } from '../../core/resolvers/transactions.resolver';
import { TransactionCategoriesResolver } from '../../core/resolvers/transaction-categories.resolver';
import { TransactionsSummaryResolver } from '../../core/resolvers/transactions-summary.resolver';
import { PortfolioResolver } from '../../core/resolvers/portfolio.resolver';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    resolve: {
      transactions: TransactionsResolver,
      transactionsCategories: TransactionCategoriesResolver,
      transactionsSummary: TransactionsSummaryResolver,
      portfolio: PortfolioResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
