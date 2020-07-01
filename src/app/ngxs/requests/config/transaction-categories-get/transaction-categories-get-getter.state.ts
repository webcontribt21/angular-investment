import { Selector } from '@ngxs/store';
import { TransactionCategoriesGetRequestState, TransactionCategoriesGetRequestStateModel } from './transaction-categories-get.state';

export class TransactionCategoriesGetGetterState {
  @Selector([TransactionCategoriesGetRequestState])
  static getState(state: TransactionCategoriesGetRequestStateModel) {
    return state;
  }
}
