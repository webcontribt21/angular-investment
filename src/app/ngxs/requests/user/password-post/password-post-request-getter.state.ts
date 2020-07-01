import { Selector } from '@ngxs/store';

import { PasswordPostRequestStateModel, PasswordPostRequestState } from './password-post-request.state';

export class PasswordPostRequestGetterState {
  @Selector([PasswordPostRequestState])
  static getPasswordPostRequestState(state: PasswordPostRequestStateModel): PasswordPostRequestStateModel {
    return state;
  }
}
