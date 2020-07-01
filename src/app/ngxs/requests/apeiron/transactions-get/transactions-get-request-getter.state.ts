import { Selector } from '@ngxs/store';
import { TransactionsGetRequestState, TransactionsGetRequestStateModel } from './transactions-get-request.state';

export class TransactionsGetRequestGetterState {
  @Selector([TransactionsGetRequestState])
  static getTransactionsState(state: TransactionsGetRequestStateModel): TransactionsGetRequestStateModel {
    return state;
  }
}
