import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  InterviewQuestionsGetRequestAction,
  InterviewQuestionsGetRequestFailAction,
  InterviewQuestionsGetRequestSuccessAction,
} from './interview-questions-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadInterviewQuestionsSuccessAction, LoadInterviewQuestionsFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface InterviewQuestionsGetRequestStateModel extends IRequestsNestedState {}

@State<InterviewQuestionsGetRequestStateModel>({
  name: 'interviewQuestionsGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class InterviewQuestionsGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(InterviewQuestionsGetRequestAction)
  interviewQuestionsGetRequest(ctx: StateContext<InterviewQuestionsGetRequestStateModel>, action: InterviewQuestionsGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.interviewQuestions).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new InterviewQuestionsGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InterviewQuestionsGetRequestFailAction(error));
      }),
    );
  }

  @Action(InterviewQuestionsGetRequestSuccessAction)
  interviewQuestionsGetRequestSuccess(
    ctx: StateContext<InterviewQuestionsGetRequestStateModel>,
    action: InterviewQuestionsGetRequestSuccessAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadInterviewQuestionsSuccessAction(action.payload));
  }

  @Action(InterviewQuestionsGetRequestFailAction)
  interviewQuestionsGetRequestFail(
    ctx: StateContext<InterviewQuestionsGetRequestStateModel>,
    action: InterviewQuestionsGetRequestFailAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadInterviewQuestionsFailAction(action.payload));
  }
}
