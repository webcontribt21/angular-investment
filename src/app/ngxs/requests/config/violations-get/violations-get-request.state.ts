import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  ViolationsGetRequestAction,
  ViolationsGetRequestFailAction,
  ViolationsGetRequestSuccessAction,
} from './violations-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadViolationsSuccessAction, LoadViolationsFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface ViolationsGetRequestStateModel extends IRequestsNestedState {}

@State<ViolationsGetRequestStateModel>({
  name: 'violationsGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class ViolationsGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(ViolationsGetRequestAction)
  violationsGetRequest(ctx: StateContext<ViolationsGetRequestStateModel>, action: ViolationsGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.violations).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new ViolationsGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new ViolationsGetRequestFailAction(error));
      }),
    );
  }

  @Action(ViolationsGetRequestSuccessAction)
  violationsGetRequestSuccess(ctx: StateContext<ViolationsGetRequestStateModel>, action: ViolationsGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadViolationsSuccessAction(action.payload));
  }

  @Action(ViolationsGetRequestFailAction)
  violationsGetRequestFail(ctx: StateContext<ViolationsGetRequestStateModel>, action: ViolationsGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadViolationsFailAction(action.payload));
  }
}
