import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { Portfolio } from '../../../../core/models';
import { ApeironService } from '../../../../core/services';

import { LoadPortfolioFailAction, LoadPortfolioSuccessAction } from '../../../apeiron/apeiron.actions';

import { IRequestsNestedState } from '../../requests.interface';

import {
  PortfolioGetRequestAction,
  PortfolioGetRequestFailAction,
  PortfolioGetRequestSuccessAction,
} from './portfolio-get-request.actions';
import { Injectable } from '@angular/core';

export interface PortfolioGetRequestStateModel extends IRequestsNestedState {}

@State<PortfolioGetRequestStateModel>({
  name: 'portfolioGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class PortfolioGetRequestState {
  constructor(private apeironService: ApeironService) {}

  @Action(PortfolioGetRequestAction)
  portfolioGetRequest(ctx: StateContext<PortfolioGetRequestStateModel>, action: PortfolioGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.apeironService.loadPortfolioRequest().pipe(
      switchMap((res: Portfolio) => {
        return ctx.dispatch(new PortfolioGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new PortfolioGetRequestFailAction(error));
      }),
    );
  }

  @Action(PortfolioGetRequestSuccessAction)
  portfolioGetRequestSuccess(ctx: StateContext<PortfolioGetRequestStateModel>, action: PortfolioGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadPortfolioSuccessAction(action.payload));
  }

  @Action(PortfolioGetRequestFailAction)
  portfolioGetRequestFail(ctx: StateContext<PortfolioGetRequestStateModel>, action: PortfolioGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadPortfolioFailAction(action.payload));
  }
}
