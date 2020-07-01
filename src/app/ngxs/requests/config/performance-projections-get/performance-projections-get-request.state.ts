import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  PerformanceProjectionsGetRequestAction,
  PerformanceProjectionsGetRequestFailAction,
  PerformanceProjectionsGetRequestSuccessAction,
} from './performance-projections-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadPerformanceProjectionsSuccessAction, LoadPerformanceProjectionsFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { Injectable } from '@angular/core';

export interface PerformanceProjectionsGetRequestStateModel extends IRequestsNestedState {}

@State<PerformanceProjectionsGetRequestStateModel>({
  name: 'performanceProjectionsGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class PerformanceProjectionsGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(PerformanceProjectionsGetRequestAction)
  performanceProjectionsGetRequest(
    ctx: StateContext<PerformanceProjectionsGetRequestStateModel>,
    action: PerformanceProjectionsGetRequestAction,
  ) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadPerformanceProjectionsRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new PerformanceProjectionsGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new PerformanceProjectionsGetRequestFailAction(error));
      }),
    );
  }

  @Action(PerformanceProjectionsGetRequestSuccessAction)
  performanceProjectionsGetRequestSuccess(
    ctx: StateContext<PerformanceProjectionsGetRequestStateModel>,
    action: PerformanceProjectionsGetRequestSuccessAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadPerformanceProjectionsSuccessAction(action.payload));
  }

  @Action(PerformanceProjectionsGetRequestFailAction)
  performanceProjectionsGetRequestFail(
    ctx: StateContext<PerformanceProjectionsGetRequestStateModel>,
    action: PerformanceProjectionsGetRequestFailAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadPerformanceProjectionsFailAction(action.payload));
  }
}
