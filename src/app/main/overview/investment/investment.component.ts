import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ApeironService, CustomerService, ProductsService } from '../../../core/services';
import { Allocation, Portfolio, StrategyToDisplay } from '../../../core/models';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss'],
})
export class InvestmentComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  strategyToDisplay$: Observable<StrategyToDisplay>;
  portfolioAllocation$: Observable<Allocation[]>;
  portfolio$: Observable<Portfolio>;

  totalAmount = 0;

  constructor(private customerService: CustomerService, private apeironService: ApeironService, private productsService: ProductsService) {}

  ngOnInit() {
    this.strategyToDisplay$ = this.customerService.strategyToDisplay$;

    this.portfolio$ = this.apeironService.portfolio$.pipe(filter(res => !!res));
    this.portfolioAllocation$ = this.portfolio$.pipe(
      filter(res => !!res),
      map(res => res.currentAllocation),
    );

    this.subscriptions.push(
      this.portfolio$.subscribe(res => {
        this.totalAmount = res.currentBalance - res.currentLiquidity;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }
}
