import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { EmailPostRequestAction, EmailPostRequestFailAction, EmailPostRequestSuccessAction } from './email-post-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { UserService } from '../../../../core/services';
import { ChangeEmailFailAction, ChangeEmailSuccessAction } from '../../../user/user.actions';
import { Injectable } from '@angular/core';

export interface EmailPostRequestStateModel extends IRequestsNestedState {}

@State<EmailPostRequestStateModel>({
  name: 'emailPostRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class EmailPostRequestState {
  constructor(private userService: UserService) {}

  @Action(EmailPostRequestAction)
  emailPostRequest(ctx: StateContext<EmailPostRequestStateModel>, action: EmailPostRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.userService.changeEmailRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new EmailPostRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new EmailPostRequestFailAction(error));
      }),
    );
  }

  @Action(EmailPostRequestSuccessAction)
  emailPostRequestSuccess(ctx: StateContext<EmailPostRequestStateModel>, action: EmailPostRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new ChangeEmailSuccessAction(action.payload));
  }

  @Action(EmailPostRequestFailAction)
  emailPostRequestFail(ctx: StateContext<EmailPostRequestStateModel>, action: EmailPostRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new ChangeEmailFailAction(action.payload));
  }
}
