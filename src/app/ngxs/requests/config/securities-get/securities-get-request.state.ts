import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  SecuritiesGetRequestAction,
  SecuritiesGetRequestFailAction,
  SecuritiesGetRequestSuccessAction,
} from './securities-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadSecuritiesSuccessAction, LoadSecuritiesFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface SecuritiesGetRequestStateModel extends IRequestsNestedState {}

@State<SecuritiesGetRequestStateModel>({
  name: 'securitiesGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class SecuritiesGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(SecuritiesGetRequestAction)
  securitiesGetRequest(ctx: StateContext<SecuritiesGetRequestStateModel>, action: SecuritiesGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.securities).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new SecuritiesGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new SecuritiesGetRequestFailAction(error));
      }),
    );
  }

  @Action(SecuritiesGetRequestSuccessAction)
  securitiesGetRequestSuccess(ctx: StateContext<SecuritiesGetRequestStateModel>, action: SecuritiesGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadSecuritiesSuccessAction(action.payload));
  }

  @Action(SecuritiesGetRequestFailAction)
  securitiesGetRequestFail(ctx: StateContext<SecuritiesGetRequestStateModel>, action: SecuritiesGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadSecuritiesFailAction(action.payload));
  }
}
