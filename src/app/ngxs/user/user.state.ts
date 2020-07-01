import { Action, State, StateContext, NgxsOnInit } from '@ngxs/store';

import { tap, first } from 'rxjs/operators';

import { User } from '../../core/models';
import { ApplicationService } from '../../core/services/application.service';
import { I18nService } from '../../core/services/i18n.service';

import {
  ChangePasswordAction,
  ChangePasswordSuccessAction,
  ClearSelfDataAction,
  SetSelfDataAction,
  LoadSelfDataAction,
  LoadSelfDataSuccessAction,
  SaveUserAction,
  SaveUserSuccessAction,
  ChangeEmailAction,
  ChangeEmailSuccessAction,
} from './user.actions';
import { UserGetRequestAction } from '../requests/user/user-get/user-get-request.actions';
import { UserPatchRequestAction } from '../requests/user/user-patch/user-patch-request.actions';
import { PasswordPostRequestAction } from '../requests/user/password-post/password-post-request.actions';
import { EmailPostRequestAction } from '../requests/user/email-post/email-post-request.actions';
import { SetGreetingAction } from '../application/application.actions';
import { Injectable } from '@angular/core';

export interface UserStateModel {
  entities: { [key: string]: User };
  ids: string[];
  selfDataId: string;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    entities: {},
    ids: [],
    selfDataId: null,
  },
})
@Injectable()
export class UserState implements NgxsOnInit {
  constructor(private applicationService: ApplicationService, private i18nService: I18nService) {}

  ngxsOnInit(ctx: StateContext<UserStateModel>) {}

  @Action(LoadSelfDataAction)
  loadSelfData(ctx: StateContext<UserStateModel>, action: LoadSelfDataAction) {
    const userId: string = action.payload;
    ctx.dispatch(new UserGetRequestAction(userId));
  }

  @Action(LoadSelfDataSuccessAction)
  loadSelfDataSuccess(ctx: StateContext<UserStateModel>, action: LoadSelfDataSuccessAction) {
    const user: User = new User(action.payload);
    ctx.dispatch([new SetSelfDataAction(user), new SetGreetingAction(user)]);
  }

  @Action(SetSelfDataAction)
  setSelfData(ctx: StateContext<UserStateModel>, action: SetSelfDataAction) {
    const user: User = new User(action.payload);
    ctx.patchState({
      selfDataId: user.id,
      ids: [...ctx.getState().ids, user.id],
      entities: {
        ...ctx.getState().entities,
        [user.id]: user,
      },
    });
  }

  @Action(ClearSelfDataAction)
  clearSelfData(ctx: StateContext<UserStateModel>, action: ClearSelfDataAction) {
    ctx.patchState({
      selfDataId: null,
    });
  }

  @Action(SaveUserAction)
  saveUser(ctx: StateContext<UserStateModel>, action: SaveUserAction) {
    const user: User = action.payload;
    ctx.dispatch(new UserPatchRequestAction(user));
  }

  @Action(SaveUserSuccessAction)
  saveUserSuccess(ctx: StateContext<UserStateModel>, action: SaveUserSuccessAction) {
    const user: User = new User(action.payload);
    ctx.patchState({
      entities: {
        ...ctx.getState().entities,
        [user.id]: user,
      },
    });
    return this.i18nService.getTranslationByKeys(['MESSAGES.COMMUNICATION_PREFERENCES_CHANGED_SUCCESSFULLY']).pipe(
      first(),
      tap(([{ label }]) => {
        this.applicationService.showToastr(label);
      }),
    );
  }

  @Action(ChangePasswordAction)
  changePassword(ctx: StateContext<UserStateModel>, action: ChangePasswordAction) {
    const data: { oldPassword: string; newPassword: string } = action.payload;
    ctx.dispatch(new PasswordPostRequestAction(data));
  }

  @Action(ChangePasswordSuccessAction)
  changePasswordSuccess(ctx: StateContext<UserStateModel>, action: ChangePasswordSuccessAction) {
    return this.i18nService.getTranslationByKeys(['MESSAGES.PASSWORD_CHANGED_SUCCESSFULLY']).pipe(
      first(),
      tap(([{ label }]) => {
        this.applicationService.showToastr(label);
      }),
    );
  }

  @Action(ChangeEmailAction)
  changeEmail(ctx: StateContext<UserStateModel>, action: ChangeEmailAction) {
    const email: string = action.payload;
    ctx.dispatch(new EmailPostRequestAction(email));
  }

  @Action(ChangeEmailSuccessAction)
  changeEmailSuccess(ctx: StateContext<UserStateModel>, action: ChangeEmailSuccessAction) {
    return this.i18nService.getTranslationByKeys(['MESSAGES.EMAIL_CHANGED_SUCCESSFULLY']).pipe(
      first(),
      tap(([{ label }]) => {
        this.applicationService.showToastr(label);
      }),
    );
  }
}
