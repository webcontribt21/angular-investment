import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';

import { ApeironHistory, Pagination, PerformancePortfolio, Portfolio, Transaction, TransactionsSummary } from '../../core/models';
import { ApplicationService } from '../../core/services/application.service';

import {
  LoadBalanceHistoryAction,
  LoadBalanceHistorySuccessAction,
  LoadPerformanceHistoryAction,
  LoadPerformanceHistorySuccessAction,
  LoadPortfolioAction,
  LoadPortfolioPerformanceAction,
  LoadPortfolioPerformanceSuccessAction,
  LoadPortfolioSuccessAction,
  LoadTransactionsAction,
  LoadTransactionsSuccessAction,
  LoadTransactionsSummaryAction,
  LoadTransactionsSummarySuccessAction,
  SelectHistoryTabAction,
  SelectBalancePeriodAction,
  SelectPerformancePeriodAction,
} from './apeiron.actions';
import { PortfolioGetRequestAction } from '../requests/apeiron/portfolio-get/portfolio-get-request.actions';
import { BalanceHistoryGetRequestAction } from '../requests/apeiron/balance-history-get/balance-history-get-request.actions';
import { PerformanceHistoryGetRequestAction } from '../requests/apeiron/performance-history-get/performance-history-get-request.actions';
import { TransactionsGetRequestAction } from '../requests/apeiron/transactions-get/transactions-get-request.actions';
import { TransactionsSummaryGetRequestAction } from '../requests/apeiron/transactions-summary-get/transactions-summary-get-request.actions';
import { Injectable } from '@angular/core';
import { HistorySelection } from '../../core/models/history-selection.model';
import { PortfolioPerformanceGetRequestActions } from '../requests/apeiron/portfolio-performance-get/portfolio-performance-get-request.actions';

export interface ApeironStateModel {
  portfolio: Portfolio;
  selectedHistory: HistorySelection;
  balanceHistory: ApeironHistory[];
  performanceHistory: ApeironHistory[];
  transactions: Transaction[];
  transactionsPagination: Pagination;
  transactionsSummary: TransactionsSummary[];
  portfolioPerformance: PerformancePortfolio[];
  selectedBalancePeriod: string;
  selectedPerformancePeriod: string;
}

@State<ApeironStateModel>({
  name: 'apeiron',
  defaults: {
    portfolio: null,
    portfolioPerformance: null,
    selectedHistory: new HistorySelection({
      tab: 0,
      range: null,
    }),
    balanceHistory: [],
    performanceHistory: [],
    transactions: [],
    transactionsPagination: new Pagination({
      offset: 0,
      totalCount: 0,
      limit: 0,
    }),
    transactionsSummary: [],
    selectedBalancePeriod: null,
    selectedPerformancePeriod: null,
  },
})
@Injectable()
export class ApeironState implements NgxsOnInit {
  constructor(private store: Store, private applicationService: ApplicationService) {}

  ngxsOnInit(ctx: StateContext<ApeironStateModel>) {
    ctx.patchState({
      transactionsPagination: {
        ...ctx.getState().transactionsPagination,
        limit: this.applicationService.paginationLimit.transactions,
      },
    });
  }

  @Action(LoadPortfolioAction)
  loadPortfolio(ctx: StateContext<ApeironStateModel>, action: LoadPortfolioAction) {
    ctx.dispatch(new PortfolioGetRequestAction());
  }

  @Action(LoadPortfolioSuccessAction)
  loadPortfolioSuccess(ctx: StateContext<ApeironStateModel>, action: LoadPortfolioSuccessAction) {
    const portfolio = new Portfolio(action.payload);
    ctx.patchState({
      portfolio,
    });
  }

  @Action(LoadPortfolioPerformanceAction)
  loadPortfolioPerformance(ctx: StateContext<ApeironStateModel>, action: LoadPortfolioPerformanceAction) {
    ctx.dispatch(new PortfolioPerformanceGetRequestActions());
  }

  @Action(LoadPortfolioPerformanceSuccessAction)
  loadPortfolioPerformanceSuccess(ctx: StateContext<ApeironStateModel>, action: LoadPortfolioPerformanceSuccessAction) {
    ctx.patchState({
      portfolioPerformance: action.payload,
    });
  }

  @Action(SelectHistoryTabAction)
  selectHistoryTab(ctx: StateContext<ApeironStateModel>, action: SelectHistoryTabAction) {
    const state = ctx.getState();
    ctx.patchState({
      selectedHistory: {
        ...state.selectedHistory,
        tab: action.payload,
      },
    });
  }

  @Action(LoadBalanceHistoryAction)
  loadBalanceHistory(ctx: StateContext<ApeironStateModel>, action: LoadBalanceHistoryAction) {
    ctx.dispatch(new BalanceHistoryGetRequestAction());
  }

  @Action(LoadBalanceHistorySuccessAction)
  loadBalanceHistorySuccess(ctx: StateContext<ApeironStateModel>, action: LoadBalanceHistorySuccessAction) {
    const history = action.payload.map(res => new ApeironHistory(res));
    ctx.patchState({
      balanceHistory: history,
    });
  }

  @Action(LoadPerformanceHistoryAction)
  loadPerformanceHistory(ctx: StateContext<ApeironStateModel>, action: LoadPerformanceHistoryAction) {
    ctx.dispatch(new PerformanceHistoryGetRequestAction());
  }

  @Action(LoadPerformanceHistorySuccessAction)
  loadPerformanceHistorySuccess(ctx: StateContext<ApeironStateModel>, action: LoadPerformanceHistorySuccessAction) {
    const performanceHistory = action.payload.map(res => new ApeironHistory(res));
    ctx.patchState({
      performanceHistory,
    });
  }

  @Action(LoadTransactionsAction)
  loadTransactions(ctx: StateContext<ApeironStateModel>, action: LoadTransactionsAction) {
    ctx.dispatch(new TransactionsGetRequestAction(action.payload));
    const state = ctx.getState();
    ctx.patchState({
      transactionsPagination: {
        ...state.transactionsPagination,
        offset: action.payload,
      },
    });
  }

  @Action(LoadTransactionsSuccessAction)
  loadTransactionsSuccess(ctx: StateContext<ApeironStateModel>, action: LoadTransactionsSuccessAction) {
    const state = ctx.getState();
    ctx.patchState({
      transactions: action.payload.items,
      transactionsPagination: {
        ...state.transactionsPagination,
        totalCount: action.payload.totalCount,
      },
    });
  }

  @Action(LoadTransactionsSummaryAction)
  loadTransactionsSummary(ctx: StateContext<ApeironStateModel>, action: LoadTransactionsSummaryAction) {
    ctx.dispatch(new TransactionsSummaryGetRequestAction());
  }

  @Action(LoadTransactionsSummarySuccessAction)
  loadTransactionsSummarySuccess(ctx: StateContext<ApeironStateModel>, action: LoadTransactionsSummarySuccessAction) {
    ctx.patchState({
      transactionsSummary: action.payload,
    });
  }

  @Action(SelectBalancePeriodAction)
  selectBalabcePeriod(ctx: StateContext<ApeironStateModel>, action: SelectBalancePeriodAction) {
    const state = ctx.getState();
    ctx.patchState({
      selectedBalancePeriod: action.payload,
    });
  }

  @Action(SelectPerformancePeriodAction)
  selectPerformancePeriod(ctx: StateContext<ApeironStateModel>, action: SelectPerformancePeriodAction) {
    const state = ctx.getState();
    ctx.patchState({
      selectedPerformancePeriod: action.payload,
    });
  }
}
