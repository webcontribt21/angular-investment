import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  IndustriesGetRequestAction,
  IndustriesGetRequestFailAction,
  IndustriesGetRequestSuccessAction,
} from './industries-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadIndustriesSuccessAction, LoadIndustriesFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface IndustriesGetRequestStateModel extends IRequestsNestedState {}

@State<IndustriesGetRequestStateModel>({
  name: 'industriesGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class IndustriesGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(IndustriesGetRequestAction)
  industriesGetRequest(ctx: StateContext<IndustriesGetRequestStateModel>, action: IndustriesGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.industries).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new IndustriesGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new IndustriesGetRequestFailAction(error));
      }),
    );
  }

  @Action(IndustriesGetRequestSuccessAction)
  industriesGetRequestSuccess(ctx: StateContext<IndustriesGetRequestStateModel>, action: IndustriesGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadIndustriesSuccessAction(action.payload));
  }

  @Action(IndustriesGetRequestFailAction)
  industriesGetRequestFail(ctx: StateContext<IndustriesGetRequestStateModel>, action: IndustriesGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadIndustriesFailAction(action.payload));
  }
}
