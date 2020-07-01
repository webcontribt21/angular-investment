import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { UserGetRequestAction, UserGetRequestFailAction, UserGetRequestSuccessAction } from './user-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadSelfDataFailAction, LoadSelfDataSuccessAction } from '../../../user/user.actions';
import { UserService } from '../../../../core/services/user.service';
import { Injectable } from '@angular/core';

export interface UserGetRequestStateModel extends IRequestsNestedState {}

@State<UserGetRequestStateModel>({
  name: 'userGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class UserGetRequestState {
  constructor(private userService: UserService) {}

  @Action(UserGetRequestAction)
  userGetRequest(ctx: StateContext<UserGetRequestStateModel>, action: UserGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.userService.loadSelfDataRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new UserGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new UserGetRequestFailAction(error));
      }),
    );
  }

  @Action(UserGetRequestSuccessAction)
  userGetRequestSuccess(ctx: StateContext<UserGetRequestStateModel>, action: UserGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadSelfDataSuccessAction(action.payload));
  }

  @Action(UserGetRequestFailAction)
  userGetRequestFail(ctx: StateContext<UserGetRequestStateModel>, action: UserGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadSelfDataFailAction(action.payload));
  }
}
