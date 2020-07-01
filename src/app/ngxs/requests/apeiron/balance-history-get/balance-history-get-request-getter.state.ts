import { Selector } from '@ngxs/store';

import { BalanceHistoryGetRequestStateModel } from './balance-history-get-request.state';

export class BalanceHistoryGetRequestGetterState {
  @Selector()
  static getBalanceHistoryState(state: BalanceHistoryGetRequestStateModel): BalanceHistoryGetRequestStateModel {
    return state;
  }
}
