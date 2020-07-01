import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  InvestmentStrategiesGetRequestAction,
  InvestmentStrategiesGetRequestFailAction,
  InvestmentStrategiesGetRequestSuccessAction,
} from './investment-strategies-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadInvestmentStrategiesSuccessAction, LoadInvestmentStrategiesFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface InvestmentStrategiesGetRequestStateModel extends IRequestsNestedState {}

@State<InvestmentStrategiesGetRequestStateModel>({
  name: 'investmentStrategiesGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class InvestmentStrategiesGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(InvestmentStrategiesGetRequestAction)
  investmentStrategiesGetRequest(
    ctx: StateContext<InvestmentStrategiesGetRequestStateModel>,
    action: InvestmentStrategiesGetRequestAction,
  ) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.investmentStrategies).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new InvestmentStrategiesGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InvestmentStrategiesGetRequestFailAction(error));
      }),
    );
  }

  @Action(InvestmentStrategiesGetRequestSuccessAction)
  investmentStrategiesGetRequestSuccess(
    ctx: StateContext<InvestmentStrategiesGetRequestStateModel>,
    action: InvestmentStrategiesGetRequestSuccessAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadInvestmentStrategiesSuccessAction(action.payload));
  }

  @Action(InvestmentStrategiesGetRequestFailAction)
  investmentStrategiesGetRequestFail(
    ctx: StateContext<InvestmentStrategiesGetRequestStateModel>,
    action: InvestmentStrategiesGetRequestFailAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadInvestmentStrategiesFailAction(action.payload));
  }
}
