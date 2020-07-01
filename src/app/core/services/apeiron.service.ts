import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Select, Store } from '@ngxs/store';

import { ApeironHistory, Customer, Portfolio, Transaction, TransactionsSummary, PerformancePortfolio } from '../models';
import { CustomerService } from './customer.service';

import {
  LoadBalanceHistoryAction,
  LoadPerformanceHistoryAction,
  LoadPortfolioAction,
  LoadTransactionsAction,
  LoadTransactionsSummaryAction,
  SelectHistoryTabAction,
  SelectBalancePeriodAction,
  SelectPerformancePeriodAction,
} from '../../ngxs/apeiron/apeiron.actions';
import { ApeironGetterState } from '../../ngxs/apeiron';
import { IRequestsNestedState } from '../../ngxs/requests/requests.interface';
import { HistorySelection } from '../models/history-selection.model';

@Injectable({
  providedIn: 'root',
})
export class ApeironService {
  @Select(ApeironGetterState.getPortfolio)
  portfolio$: Observable<Portfolio>;
  portfolioGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ApeironGetterState.getPortfolioPerformance)
  portfolioPerformance$: Observable<PerformancePortfolio>;

  @Select(ApeironGetterState.getSelectedHistory)
  selectedHistory$: Observable<HistorySelection>;

  @Select(ApeironGetterState.getBalanceHistory)
  balanceHistory$: Observable<ApeironHistory[]>;
  balanceHistoryGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ApeironGetterState.getPerformanceHistory)
  performanceHistory$: Observable<ApeironHistory[]>;
  performanceHistoryGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ApeironGetterState.getTransactions)
  transactions$: Observable<Transaction[]>;
  transactionsGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ApeironGetterState.getTransactionsPaginationOptions)
  transactionsPaginationOptions$: Observable<{ totalCount: number; offset: number; limit: number }>;

  @Select(ApeironGetterState.getTransactionsSummary)
  transactionsSummary$: Observable<TransactionsSummary[]>;
  transactionsSummaryGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ApeironGetterState.getSelectedBalancePeriod)
  selectedBalancePeriod$: Observable<string>;

  @Select(ApeironGetterState.getSelectedPerformancePeriod)
  selectedPerformancePeriod$: Observable<string>;

  private selectedCustomerId$: Observable<string>;

  constructor(private store: Store, private httpClient: HttpClient, private customerService: CustomerService) {
    this.portfolioGetRequestState$ = this.store.select(state => state.requests.portfolioGetRequestState);
    this.balanceHistoryGetRequestState$ = this.store.select(state => state.requests.balanceHistoryGetRequestState);
    this.performanceHistoryGetRequestState$ = this.store.select(state => state.requests.performanceHistoryGetRequestState);
    this.transactionsGetRequestState$ = this.store.select(state => state.requests.transactionsGetRequestState);
    this.transactionsSummaryGetRequestState$ = this.store.select(state => state.requests.transactionsSummaryGetRequestState);

    this.selectedCustomerId$ = this.customerService.selectedCustomer$.pipe(
      filter(res => !!res),
      map((customer: Customer) => customer.id),
    );
  }

  selectHistoryTab(selection: number) {
    this.store.dispatch(new SelectHistoryTabAction(selection));
  }

  loadPortfolio(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadPortfolioAction());
    return this.portfolioGetRequestState$;
  }

  loadPortfolioRequest() {
    return this.customerService.selectedCustomer$.pipe(
      filter(res => !!res),
      take(1),
      switchMap(({ id }: Customer) =>
        this.httpClient.get('apeiron/portfolio', {
          params: {
            customerId: id,
          },
        }),
      ),
    );
  }

  loadPortfolioPerformanceRequest() {
    return this.customerService.selectedCustomer$.pipe(
      filter(res => !!res),
      take(1),
      switchMap(({ id }: Customer) =>
        this.httpClient.get('/apeiron/v3/summary', {
          params: {
            customerId: id,
          },
        }),
      ),
    );
  }

  loadBalanceHistory(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadBalanceHistoryAction());
    return this.balanceHistoryGetRequestState$;
  }

  loadBalanceHistoryRequest() {
    return this.customerService.selectedCustomer$.pipe(
      filter(res => !!res),
      take(1),
      switchMap(({ id }: Customer) =>
        this.httpClient.get('apeiron/balance-history', {
          params: {
            customerId: id,
          },
        }),
      ),
    );
  }

  loadPerformanceHistory(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadPerformanceHistoryAction());
    return this.performanceHistoryGetRequestState$;
  }

  loadPerformanceHistoryRequest() {
    return this.selectedCustomerId$.pipe(
      take(1),
      switchMap((customerId: string) =>
        this.httpClient.get('apeiron/performance-history', {
          params: {
            customerId,
          },
        }),
      ),
    );
  }

  loadTransactions(offset = 0): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadTransactionsAction(offset));
    return this.transactionsGetRequestState$;
  }

  loadTransactionsRequest(offset: number): Observable<any> {
    return this.selectedCustomerId$.pipe(
      take(1),
      withLatestFrom(this.transactionsPaginationOptions$),
      switchMap(([customerId, paginationOptions]) => {
        return this.httpClient.get('apeiron/transactions', {
          params: {
            customerId,
            limit: paginationOptions.limit.toString(),
            offset: offset.toString(),
          },
        });
      }),
    );
  }

  loadTransactionsSummary() {
    this.store.dispatch(new LoadTransactionsSummaryAction());
  }

  loadTransactionsSummaryRequest(): Observable<any> {
    return this.selectedCustomerId$.pipe(
      take(1),
      switchMap(customerId =>
        this.httpClient.get('apeiron/transactions-summary', {
          params: {
            customerId,
          },
        }),
      ),
    );
  }

  setBalancePeriod(selection: string) {
    this.store.dispatch(new SelectBalancePeriodAction(selection));
  }

  setPerformancePeriod(selection: string) {
    this.store.dispatch(new SelectPerformancePeriodAction(selection));
  }
}
