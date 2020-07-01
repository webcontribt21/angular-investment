import { Selector } from '@ngxs/store';

import { TitlesGetRequestStateModel, TitlesGetRequestState } from './titles-get-request.state';

export class TitlesGetRequestGetterState {
  @Selector([TitlesGetRequestState])
  static getTitlesGetRequestState(state: TitlesGetRequestStateModel): TitlesGetRequestStateModel {
    return state;
  }
}
