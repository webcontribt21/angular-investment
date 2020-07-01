import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { filter, skip, map } from 'rxjs/operators';

import { ApeironService, ApplicationService, CustomerService, I18nService } from '../../core/services';
import { Transaction } from '../../core/models';
import { SelectItem } from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  isTabletsHorizontal$: Observable<boolean>;
  isTransactionsEmpty$: Observable<boolean>;

  constructor(
    private customerService: CustomerService,
    private apeironService: ApeironService,
    private appService: ApplicationService,
    private i18nService: I18nService,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.isTabletsHorizontal$ = this.appService.isTabletsHorizontal$;
    this.isTransactionsEmpty$ = this.apeironService.transactions$.pipe(
      map((transactions: Transaction[]) => !transactions || !transactions.length || transactions.length === 0),
    );

    this.subscriptions.push(
      // load transactions and summary on customer switch
      this.customerService.selectedCustomer$
        .pipe(
          filter(res => !!res),
          skip(1),
        )
        .subscribe(() => {
          this.apeironService.loadTransactions();
          this.apeironService.loadTransactionsSummary();
        }),

      this.i18nService.getTranslationByKeys(['PAGES_TITLES.TRANSACTIONS']).subscribe((item: SelectItem[]) => {
        const [title] = item;
        this.titleService.setTitle(title.label);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }
}
