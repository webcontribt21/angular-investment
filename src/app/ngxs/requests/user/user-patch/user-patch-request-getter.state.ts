import { Selector } from '@ngxs/store';

import { UserPatchRequestStateModel, UserPatchRequestState } from './user-patch-request.state';

export class UserPatchRequestPatchterState {
  @Selector([UserPatchRequestState])
  static getUserPatchRequestState(state: UserPatchRequestStateModel): UserPatchRequestStateModel {
    return state;
  }
}
