import { Selector } from '@ngxs/store';

import { PerformanceHistoryGetRequestStateModel } from './performance-history-get-request.state';

export class PerformanceHistoryGetRequestGetterState {
  @Selector()
  static getPerformanceHistoryState(state: PerformanceHistoryGetRequestStateModel): PerformanceHistoryGetRequestStateModel {
    return state;
  }
}
