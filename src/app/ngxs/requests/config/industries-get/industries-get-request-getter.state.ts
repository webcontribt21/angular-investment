import { Selector } from '@ngxs/store';

import { IndustriesGetRequestStateModel, IndustriesGetRequestState } from './industries-get-request.state';

export class IndustriesGetRequestGetterState {
  @Selector([IndustriesGetRequestState])
  static getIndustriesGetRequestState(state: IndustriesGetRequestStateModel): IndustriesGetRequestStateModel {
    return state;
  }
}
