import { TransactionsSummary } from '../../../../core/models';

export class TransactionsSummaryGetRequestAction {
  static type = '[Requests] Transactions Summary Get';
}

export class TransactionsSummaryGetRequestSuccessAction {
  static type = '[Requests] Transactions Summary Get Success';

  constructor(public payload: TransactionsSummary[]) {}
}

export class TransactionsSummaryGetRequestFailAction {
  static type = '[Requests] Transactions Summary Get Fail';

  constructor(public payload: any) {}
}
