import { Selector } from '@ngxs/store';

import { RiskProfilesGetRequestStateModel, RiskProfilesGetRequestState } from './risk-profiles-get-request.state';

export class RiskProfilesGetRequestGetterState {
  @Selector([RiskProfilesGetRequestState])
  static getRiskProfilesGetRequestState(state: RiskProfilesGetRequestStateModel): RiskProfilesGetRequestStateModel {
    return state;
  }
}
