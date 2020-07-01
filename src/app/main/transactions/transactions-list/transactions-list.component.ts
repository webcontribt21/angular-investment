import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Pagination, Transaction, TransactionCategory } from '../../../core/models';
import { ApeironService, ConfigService, I18nService } from '../../../core/services';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  transactionsPagination$: Observable<Pagination>;

  constructor(private apeironService: ApeironService, private configService: ConfigService, private i18nService: I18nService) {}

  ngOnInit() {
    this.transactions$ = this.i18nService.selectedLang$.pipe(
      switchMap(selectedLang => {
        return this.apeironService.transactions$.pipe(
          withLatestFrom(this.configService.transactionCategories$),
          map(([transactions, categories]) => {
            return transactions.map(transaction => {
              const currentCategory: TransactionCategory = categories.find(cat => {
                return cat.code === transaction.type;
              });
              return {
                ...transaction,
                type: currentCategory.label[selectedLang],
              };
            });
          }),
        );
      }),
    );
    this.transactionsPagination$ = this.apeironService.transactionsPaginationOptions$;
  }

  onPageChanged(newOffset: number) {
    this.apeironService.loadTransactions(newOffset);
  }
}
