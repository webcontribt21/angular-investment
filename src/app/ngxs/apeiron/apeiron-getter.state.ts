import { Selector } from '@ngxs/store';

import { Portfolio, ApeironHistory, Transaction, TransactionsSummary } from '../../core/models';

import { ApeironState, ApeironStateModel } from './apeiron.state';
import { HistorySelection } from '../../core/models/history-selection.model';

export class ApeironGetterState {
  @Selector([ApeironState])
  static getApeironState(state: ApeironStateModel): ApeironStateModel {
    return state;
  }

  @Selector([ApeironState])
  static getPortfolio(state: ApeironStateModel): Portfolio {
    return state.portfolio;
  }

  @Selector([ApeironState])
  static getPortfolioPerformance(state: ApeironStateModel): any {
    return state.portfolioPerformance;
  }

  @Selector([ApeironState])
  static getSelectedHistory(state: ApeironStateModel): HistorySelection {
    return state.selectedHistory;
  }

  @Selector([ApeironState])
  static getBalanceHistory(state: ApeironStateModel): ApeironHistory[] {
    return state.balanceHistory;
  }

  @Selector([ApeironState])
  static getPerformanceHistory(state: ApeironStateModel): ApeironHistory[] {
    return state.performanceHistory;
  }

  @Selector([ApeironState])
  static getTransactions(state: ApeironStateModel): Transaction[] {
    return state.transactions;
  }

  @Selector([ApeironState])
  static getTransactionsPaginationOptions(state: ApeironStateModel): { offset: number; totalCount: number; limit: number } {
    return state.transactionsPagination;
  }

  @Selector([ApeironState])
  static getTransactionsSummary(state: ApeironStateModel): TransactionsSummary[] {
    return state.transactionsSummary;
  }

  @Selector([ApeironState])
  static getSelectedBalancePeriod(state: ApeironStateModel): string {
    return state.selectedBalancePeriod;
  }

  @Selector([ApeironState])
  static getSelectedPerformancePeriod(state: ApeironStateModel): string {
    return state.selectedPerformancePeriod;
  }
}
