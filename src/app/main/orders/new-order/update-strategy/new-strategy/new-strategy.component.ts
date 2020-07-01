import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, pluck, withLatestFrom } from 'rxjs/operators';

import { CustomerService, InterviewService, OrderService } from '../../../../../core/services';
import { OrderTypeEnum } from '../../../../../core/enums/order-type.enum';
import { InvestmentStrategyEnum } from '../../../../../core/enums/investment-strategy.enum';

@Component({
  selector: 'app-new-strategy',
  templateUrl: './new-strategy.component.html',
  styleUrls: ['./new-strategy.component.scss'],
})
export class NewStrategyComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  updateStrategyEvent$: Subject<any> = new Subject();
  isStrategyChanged$: Observable<boolean> = this.interviewService.selectedInvestmentStrategy$.pipe(
    withLatestFrom(this.customerService.selectedCustomer$.pipe(pluck('currentInvestmentStrategy'))),
    map(([selectedStrategy, prevStrategy]) => selectedStrategy !== prevStrategy),
  );

  constructor(private interviewService: InterviewService, private orderService: OrderService, private customerService: CustomerService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.updateStrategyEvent$
        .pipe(
          withLatestFrom(
            this.interviewService.selectedInvestmentStrategy$,
            this.interviewService.selectedInterview$.pipe(
              filter(res => !!res),
              pluck('id'),
            ),
          ),
        )
        .subscribe(([, strategy, interviewId]: [any, InvestmentStrategyEnum, string]) => {
          const order = {
            orderType: OrderTypeEnum.strategyChange,
            interviewId,
            strategy,
          };
          this.orderService.createOrder(order);
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());

    // clear interview to match all guards
    this.interviewService.clearSelectedInterview();
    this.interviewService.clearSelectedInvestmentStrategy();
  }

  updateStrategy() {
    this.updateStrategyEvent$.next();
  }
}
