import { Selector } from '@ngxs/store';

import { SecuritiesGetRequestStateModel, SecuritiesGetRequestState } from './securities-get-request.state';

export class SecuritiesGetRequestGetterState {
  @Selector([SecuritiesGetRequestState])
  static getSecuritiesGetRequestState(state: SecuritiesGetRequestStateModel): SecuritiesGetRequestStateModel {
    return state;
  }
}
