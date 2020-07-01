import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  InterviewAnswersGetRequestAction,
  InterviewAnswersGetRequestFailAction,
  InterviewAnswersGetRequestSuccessAction,
} from './interview-answers-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadInterviewAnswersSuccessAction, LoadInterviewAnswersFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface InterviewAnswersGetRequestStateModel extends IRequestsNestedState {}

@State<InterviewAnswersGetRequestStateModel>({
  name: 'interviewAnswersGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class InterviewAnswersGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(InterviewAnswersGetRequestAction)
  interviewAnswersGetRequest(ctx: StateContext<InterviewAnswersGetRequestStateModel>, action: InterviewAnswersGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.interviewAnswers).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new InterviewAnswersGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InterviewAnswersGetRequestFailAction(error));
      }),
    );
  }

  @Action(InterviewAnswersGetRequestSuccessAction)
  interviewAnswersGetRequestSuccess(
    ctx: StateContext<InterviewAnswersGetRequestStateModel>,
    action: InterviewAnswersGetRequestSuccessAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadInterviewAnswersSuccessAction(action.payload));
  }

  @Action(InterviewAnswersGetRequestFailAction)
  interviewAnswersGetRequestFail(ctx: StateContext<InterviewAnswersGetRequestStateModel>, action: InterviewAnswersGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadInterviewAnswersFailAction(action.payload));
  }
}
