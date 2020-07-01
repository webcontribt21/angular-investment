import { Selector } from '@ngxs/store';

import { EmailPostRequestStateModel, EmailPostRequestState } from './email-post-request.state';

export class EmailPostRequestGetterState {
  @Selector([EmailPostRequestState])
  static getEmailPostRequestState(state: EmailPostRequestStateModel): EmailPostRequestStateModel {
    return state;
  }
}
