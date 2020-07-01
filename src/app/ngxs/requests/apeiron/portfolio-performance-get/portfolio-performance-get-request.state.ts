import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { ApeironService } from '../../../../core/services';

import { LoadPortfolioPerformanceFailAction, LoadPortfolioPerformanceSuccessAction } from '../../../apeiron/apeiron.actions';

import { IRequestsNestedState } from '../../requests.interface';

import {
  PortfolioPerformanceGetRequestActions,
  PortfolioPerformanceGetRequestFailAction,
  PortfolioPerformanceGetRequestSuccessAction,
} from './portfolio-performance-get-request.actions';
import { Injectable } from '@angular/core';
import { requestFailState, requestSuccessState, requestInitialState, requestLoadingState } from '../../../utils';

export interface PortfolioPerformanceGetRequestStateModel extends IRequestsNestedState {}

@State<PortfolioPerformanceGetRequestStateModel>({
  name: 'portfolioPerformanceGetRequestState',
  defaults: requestInitialState,
})
@Injectable()
export class PortfolioPerformanceGetRequestState {
  constructor(private apeironService: ApeironService) {}

  @Action(PortfolioPerformanceGetRequestActions)
  portfolioGetRequest(ctx: StateContext<PortfolioPerformanceGetRequestStateModel>, action: PortfolioPerformanceGetRequestActions) {
    ctx.patchState(requestLoadingState);
    return this.apeironService.loadPortfolioPerformanceRequest().pipe(
      switchMap(res => {
        return ctx.dispatch(new PortfolioPerformanceGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new PortfolioPerformanceGetRequestFailAction(error));
      }),
    );
  }

  @Action(PortfolioPerformanceGetRequestSuccessAction)
  portfolioPerformanceGetRequestSuccess(
    ctx: StateContext<PortfolioPerformanceGetRequestStateModel>,
    action: PortfolioPerformanceGetRequestSuccessAction,
  ) {
    ctx.patchState(requestSuccessState(action.payload));
    ctx.dispatch(new LoadPortfolioPerformanceSuccessAction(action.payload));
  }

  @Action(PortfolioPerformanceGetRequestFailAction)
  portfolioPerformanceGetRequestFail(
    ctx: StateContext<PortfolioPerformanceGetRequestStateModel>,
    action: PortfolioPerformanceGetRequestFailAction,
  ) {
    ctx.patchState(requestFailState(action.payload));
    ctx.dispatch(new LoadPortfolioPerformanceFailAction(action.payload));
  }
}
