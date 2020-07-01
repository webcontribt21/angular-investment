import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ApeironService, ApplicationService } from '../../../core/services';
import { Portfolio, TransactionsSummary } from '../../../core/models';

@Component({
  selector: 'app-transactions-info',
  templateUrl: './transactions-info.component.html',
  styleUrls: ['./transactions-info.component.scss'],
})
export class TransactionsInfoComponent implements OnInit {
  isMobile$: Observable<boolean>;
  portfolio$: Observable<Portfolio>;
  dividendCategory$: Observable<number>;
  taxOptimizationCategory$: Observable<number>;

  constructor(private apeironService: ApeironService, private appService: ApplicationService) {}

  ngOnInit() {
    this.isMobile$ = this.appService.isMobile$;
    this.portfolio$ = this.apeironService.portfolio$.pipe(filter(res => !!res));

    this.dividendCategory$ = this.apeironService.transactionsSummary$.pipe(
      map((transactionsSummary: TransactionsSummary[]) => {
        const dividendCategory = transactionsSummary.find(summary => summary.transactionCategory === 'DIVIDEND');
        return dividendCategory && dividendCategory.sumAmount;
      }),
    );

    this.taxOptimizationCategory$ = this.apeironService.transactionsSummary$.pipe(
      map((transactionsSummary: TransactionsSummary[]) => {
        const taxOptimizationCategory = transactionsSummary.find(summary => {
          return summary.transactionCategory === 'TAX_OPTIMIZATION';
        });
        return taxOptimizationCategory && taxOptimizationCategory.sumAmount;
      }),
    );
  }
}
