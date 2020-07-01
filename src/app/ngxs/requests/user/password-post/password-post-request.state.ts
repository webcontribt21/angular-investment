import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  PasswordPostRequestAction,
  PasswordPostRequestFailAction,
  PasswordPostRequestSuccessAction,
} from './password-post-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { UserService } from '../../../../core/services';
import { ChangePasswordFailAction, ChangePasswordSuccessAction } from '../../../user/user.actions';
import { Injectable } from '@angular/core';

export interface PasswordPostRequestStateModel extends IRequestsNestedState {}

@State<PasswordPostRequestStateModel>({
  name: 'passwordPostRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class PasswordPostRequestState {
  constructor(private userService: UserService) {}

  @Action(PasswordPostRequestAction)
  passwordPostRequest(ctx: StateContext<PasswordPostRequestStateModel>, action: PasswordPostRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.userService.changePasswordRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new PasswordPostRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new PasswordPostRequestFailAction(error));
      }),
    );
  }

  @Action(PasswordPostRequestSuccessAction)
  passwordPostRequestSuccess(ctx: StateContext<PasswordPostRequestStateModel>, action: PasswordPostRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new ChangePasswordSuccessAction(action.payload));
  }

  @Action(PasswordPostRequestFailAction)
  passwordPostRequestFail(ctx: StateContext<PasswordPostRequestStateModel>, action: PasswordPostRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new ChangePasswordFailAction(action.payload));
  }
}
