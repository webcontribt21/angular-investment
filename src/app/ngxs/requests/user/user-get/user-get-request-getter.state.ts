import { Selector } from '@ngxs/store';

import { UserGetRequestStateModel, UserGetRequestState } from './user-get-request.state';

export class UserGetRequestGetterState {
  @Selector([UserGetRequestState])
  static getUserGetRequestState(state: UserGetRequestStateModel): UserGetRequestStateModel {
    return state;
  }
}
