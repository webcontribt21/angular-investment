import { Portfolio, ApeironHistory, Transaction, TransactionsSummary, PerformancePortfolio } from '../../core/models';

const ActionTypes = {
  LOAD_PORTFOLIO: '[Apeiron] Load Portfolio',
  LOAD_PORTFOLIO_SUCCESS: '[Apeiron] Load Portfolio Success',
  LOAD_PORTFOLIO_FAIL: '[Apeiron] Load Portfolio Fail',

  LOAD_PORTFOLIO_PERFORMANCE: '[Apeiron] Load Portfolio Performance',
  LOAD_PORTFOLIO_PERFORMANCE_SUCCESS: '[Apeiron] Load Portfolio Performance Success',
  LOAD_PORTFOLIO_PERFORMANCE_FAIL: '[Apeiron] Load Portfolio Performance Fail',

  SELECT_HISTORY_TAB: '[Apeiron] Select History Tab',

  LOAD_BALANCE_HISTORY: '[Apeiron] Load Balance History',
  LOAD_BALANCE_HISTORY_SUCCESS: '[Apeiron] Load Balance History Success',
  LOAD_BALANCE_HISTORY_FAIL: '[Apeiron] Load Balance History Fail',

  LOAD_PERFORMANCE_HISTORY: '[Apeiron] Load Performance History',
  LOAD_PERFORMANCE_HISTORY_SUCCESS: '[Apeiron] Load Performance History Success',
  LOAD_PERFORMANCE_HISTORY_FAIL: '[Apeiron] Load Performance History Fail',

  LOAD_TRANSACTIONS: '[Apeiron] Load Transactions',
  LOAD_TRANSACTIONS_SUCCESS: '[Apeiron] Load Transactions Success',
  LOAD_TRANSACTIONS_FAIL: '[Apeiron] Load Transactions Fail',

  LOAD_TRANSACTIONS_SUMMARY: '[Apeiron] Load Transactions Summary',
  LOAD_TRANSACTIONS_SUMMARY_SUCCESS: '[Apeiron] Load Transactions Summary Success',
  LOAD_TRANSACTIONS_SUMMARY_FAIL: '[Apeiron] Load Transactions Summary Fail',

  SELECT_BALANCE_PERIOD: '[Apeiron] Select Balance Period',
  SELECT_PERFORMANCE_PERIOD: '[Apeiron] Select Performance Period',
};

export class LoadPortfolioAction {
  static type = ActionTypes.LOAD_PORTFOLIO;
}
export class LoadPortfolioSuccessAction {
  static type = ActionTypes.LOAD_PORTFOLIO_SUCCESS;

  constructor(public payload: Portfolio) {}
}
export class LoadPortfolioFailAction {
  static type = ActionTypes.LOAD_PORTFOLIO_FAIL;

  constructor(public payload?: any) {}
}

export class LoadPortfolioPerformanceAction {
  static type = ActionTypes.LOAD_PORTFOLIO_PERFORMANCE;
}
export class LoadPortfolioPerformanceSuccessAction {
  static type = ActionTypes.LOAD_PORTFOLIO_PERFORMANCE_SUCCESS;

  constructor(public payload: PerformancePortfolio[]) {}
}
export class LoadPortfolioPerformanceFailAction {
  static type = ActionTypes.LOAD_PORTFOLIO_PERFORMANCE_FAIL;

  constructor(public payload?: any) {}
}

export class SelectHistoryTabAction {
  static type = ActionTypes.SELECT_HISTORY_TAB;
  constructor(public payload: number) {}
}

export class LoadBalanceHistoryAction {
  static type = ActionTypes.LOAD_BALANCE_HISTORY;
}
export class LoadBalanceHistorySuccessAction {
  static type = ActionTypes.LOAD_BALANCE_HISTORY_SUCCESS;

  constructor(public payload: ApeironHistory[]) {}
}
export class LoadBalanceHistoryFailAction {
  static type = ActionTypes.LOAD_BALANCE_HISTORY_FAIL;

  constructor(public payload?: any) {}
}

export class LoadPerformanceHistoryAction {
  static type = ActionTypes.LOAD_PERFORMANCE_HISTORY;
}
export class LoadPerformanceHistorySuccessAction {
  static type = ActionTypes.LOAD_PERFORMANCE_HISTORY_SUCCESS;

  constructor(public payload: ApeironHistory[]) {}
}
export class LoadPerformanceHistoryFailAction {
  static type = ActionTypes.LOAD_PERFORMANCE_HISTORY_FAIL;

  constructor(public payload?: any) {}
}

export class LoadTransactionsAction {
  static type = ActionTypes.LOAD_TRANSACTIONS;

  constructor(public payload: number) {}
}
export class LoadTransactionsSuccessAction {
  static type = ActionTypes.LOAD_TRANSACTIONS_SUCCESS;

  constructor(public payload: { items: Transaction[]; totalCount: number }) {}
}
export class LoadTransactionsFailAction {
  static type = ActionTypes.LOAD_TRANSACTIONS_FAIL;

  constructor(public payload?: any) {}
}

export class LoadTransactionsSummaryAction {
  constructor(public payload?: any) {}

  static type = ActionTypes.LOAD_TRANSACTIONS_SUMMARY;
}
export class LoadTransactionsSummarySuccessAction {
  static type = ActionTypes.LOAD_TRANSACTIONS_SUMMARY_SUCCESS;

  constructor(public payload: TransactionsSummary[]) {}
}
export class LoadTransactionsSummaryFailAction {
  static type = ActionTypes.LOAD_TRANSACTIONS_SUMMARY_FAIL;

  constructor(public payload?: any) {}
}

export class SelectBalancePeriodAction {
  static type = ActionTypes.SELECT_BALANCE_PERIOD;
  constructor(public payload: string) {}
}
export class SelectPerformancePeriodAction {
  static type = ActionTypes.SELECT_PERFORMANCE_PERIOD;
  constructor(public payload: string) {}
}
