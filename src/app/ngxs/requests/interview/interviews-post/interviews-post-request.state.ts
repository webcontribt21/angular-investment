import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  InterviewsPostRequestAction,
  InterviewsPostRequestFailAction,
  InterviewsPostRequestSuccessAction,
} from './interviews-post-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { InterviewService } from '../../../../core/services';
import { SaveInterviewFailAction, SaveInterviewSuccessAction } from '../../../interview/interview.actions';
import { Injectable } from '@angular/core';

export interface InterviewsPostRequestStateModel extends IRequestsNestedState {}

@State<InterviewsPostRequestStateModel>({
  name: 'interviewsPostRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class InterviewsPostRequestState {
  constructor(private interviewService: InterviewService) {}

  @Action(InterviewsPostRequestAction)
  interviewsPostRequest(ctx: StateContext<InterviewsPostRequestStateModel>, action: InterviewsPostRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.interviewService.saveInterviewRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new InterviewsPostRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InterviewsPostRequestFailAction(error));
      }),
    );
  }

  @Action(InterviewsPostRequestSuccessAction)
  interviewsPostRequestSuccess(ctx: StateContext<InterviewsPostRequestStateModel>, action: InterviewsPostRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new SaveInterviewSuccessAction(action.payload));
  }

  @Action(InterviewsPostRequestFailAction)
  interviewsPostRequestFail(ctx: StateContext<InterviewsPostRequestStateModel>, action: InterviewsPostRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new SaveInterviewFailAction(action.payload));
  }
}
