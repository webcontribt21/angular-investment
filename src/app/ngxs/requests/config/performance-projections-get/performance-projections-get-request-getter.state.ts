import { Selector } from '@ngxs/store';

import {
  PerformanceProjectionsGetRequestStateModel,
  PerformanceProjectionsGetRequestState,
} from './performance-projections-get-request.state';

export class PerformanceProjectionsGetRequestGetterState {
  @Selector([PerformanceProjectionsGetRequestState])
  static getPerformanceProjectionsGetRequestState(
    state: PerformanceProjectionsGetRequestStateModel,
  ): PerformanceProjectionsGetRequestStateModel {
    return state;
  }
}
