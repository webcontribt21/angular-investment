import { Selector } from '@ngxs/store';

import { InterviewQuestionsGetRequestStateModel, InterviewQuestionsGetRequestState } from './interview-questions-get-request.state';

export class InterviewQuestionsGetRequestGetterState {
  @Selector([InterviewQuestionsGetRequestState])
  static getInterviewQuestionsGetRequestState(state: InterviewQuestionsGetRequestStateModel): InterviewQuestionsGetRequestStateModel {
    return state;
  }
}
