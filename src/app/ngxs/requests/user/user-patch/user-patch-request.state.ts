import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { UserPatchRequestAction, UserPatchRequestFailAction, UserPatchRequestSuccessAction } from './user-patch-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { SaveUserFailAction, SaveUserSuccessAction } from '../../../user/user.actions';
import { UserService } from '../../../../core/services/user.service';
import { Injectable } from '@angular/core';

export interface UserPatchRequestStateModel extends IRequestsNestedState {}

@State<UserPatchRequestStateModel>({
  name: 'userPatchRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class UserPatchRequestState {
  constructor(private userService: UserService) {}

  @Action(UserPatchRequestAction)
  userPatchRequest(ctx: StateContext<UserPatchRequestStateModel>, action: UserPatchRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.userService.saveUserRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new UserPatchRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new UserPatchRequestFailAction(error));
      }),
    );
  }

  @Action(UserPatchRequestSuccessAction)
  userPatchRequestSuccess(ctx: StateContext<UserPatchRequestStateModel>, action: UserPatchRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new SaveUserSuccessAction(action.payload));
  }

  @Action(UserPatchRequestFailAction)
  userPatchRequestFail(ctx: StateContext<UserPatchRequestStateModel>, action: UserPatchRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new SaveUserFailAction(action.payload));
  }
}
