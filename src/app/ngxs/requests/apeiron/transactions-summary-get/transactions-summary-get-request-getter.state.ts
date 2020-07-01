import { Selector } from '@ngxs/store';

import { TransactionsSummaryGetRequestStateModel } from './transactions-summary-get-request.state';

export class TransactionsSummaryGetRequestGetterState {
  @Selector()
  static getApeironGetTransactionsSummaryState(state: TransactionsSummaryGetRequestStateModel): TransactionsSummaryGetRequestStateModel {
    return state;
  }
}
