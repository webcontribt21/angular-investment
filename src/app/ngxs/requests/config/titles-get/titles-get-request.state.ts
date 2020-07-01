import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { TitlesGetRequestAction, TitlesGetRequestFailAction, TitlesGetRequestSuccessAction } from './titles-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadTitlesSuccessAction, LoadTitlesFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface TitlesGetRequestStateModel extends IRequestsNestedState {}

@State<TitlesGetRequestStateModel>({
  name: 'titlesGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class TitlesGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(TitlesGetRequestAction)
  titlesGetRequest(ctx: StateContext<TitlesGetRequestStateModel>, action: TitlesGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.titles).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new TitlesGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new TitlesGetRequestFailAction(error));
      }),
    );
  }

  @Action(TitlesGetRequestSuccessAction)
  titlesGetRequestSuccess(ctx: StateContext<TitlesGetRequestStateModel>, action: TitlesGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadTitlesSuccessAction(action.payload));
  }

  @Action(TitlesGetRequestFailAction)
  titlesGetRequestFail(ctx: StateContext<TitlesGetRequestStateModel>, action: TitlesGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadTitlesFailAction(action.payload));
  }
}
