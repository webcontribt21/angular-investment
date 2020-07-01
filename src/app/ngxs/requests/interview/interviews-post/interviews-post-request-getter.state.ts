import { Selector } from '@ngxs/store';

import { InterviewsPostRequestStateModel, InterviewsPostRequestState } from './interviews-post-request.state';

export class InterviewsPostRequestGetterState {
  @Selector([InterviewsPostRequestState])
  static getInterviewsPostRequestState(state: InterviewsPostRequestStateModel): InterviewsPostRequestStateModel {
    return state;
  }
}
