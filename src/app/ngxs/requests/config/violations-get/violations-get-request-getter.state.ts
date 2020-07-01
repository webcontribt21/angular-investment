import { Selector } from '@ngxs/store';

import { ViolationsGetRequestStateModel, ViolationsGetRequestState } from './violations-get-request.state';

export class ViolationsGetRequestGetterState {
  @Selector([ViolationsGetRequestState])
  static getViolationsGetRequestState(state: ViolationsGetRequestStateModel): ViolationsGetRequestStateModel {
    return state;
  }
}
