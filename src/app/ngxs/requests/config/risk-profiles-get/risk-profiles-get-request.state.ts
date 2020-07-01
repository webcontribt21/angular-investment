import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  RiskProfilesGetRequestAction,
  RiskProfilesGetRequestFailAction,
  RiskProfilesGetRequestSuccessAction,
} from './risk-profiles-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadRiskProfilesSuccessAction, LoadRiskProfilesFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface RiskProfilesGetRequestStateModel extends IRequestsNestedState {}

@State<RiskProfilesGetRequestStateModel>({
  name: 'riskProfilesGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class RiskProfilesGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(RiskProfilesGetRequestAction)
  riskProfilesGetRequest(ctx: StateContext<RiskProfilesGetRequestStateModel>, action: RiskProfilesGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.riskProfiles).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new RiskProfilesGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new RiskProfilesGetRequestFailAction(error));
      }),
    );
  }

  @Action(RiskProfilesGetRequestSuccessAction)
  riskProfilesGetRequestSuccess(ctx: StateContext<RiskProfilesGetRequestStateModel>, action: RiskProfilesGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadRiskProfilesSuccessAction(action.payload));
  }

  @Action(RiskProfilesGetRequestFailAction)
  riskProfilesGetRequestFail(ctx: StateContext<RiskProfilesGetRequestStateModel>, action: RiskProfilesGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadRiskProfilesFailAction(action.payload));
  }
}
