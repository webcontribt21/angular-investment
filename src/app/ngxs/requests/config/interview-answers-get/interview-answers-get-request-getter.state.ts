import { Selector } from '@ngxs/store';

import { InterviewAnswersGetRequestStateModel, InterviewAnswersGetRequestState } from './interview-answers-get-request.state';

export class InterviewAnswersGetRequestGetterState {
  @Selector([InterviewAnswersGetRequestState])
  static getInterviewAnswersGetRequestState(state: InterviewAnswersGetRequestStateModel): InterviewAnswersGetRequestStateModel {
    return state;
  }
}
