import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { ApeironHistory } from '../../../../core/models';
import { ApeironService } from '../../../../core/services';

import { LoadPerformanceHistoryFailAction, LoadPerformanceHistorySuccessAction } from '../../../apeiron/apeiron.actions';

import { IRequestsNestedState } from '../../requests.interface';

import {
  PerformanceHistoryGetRequestAction,
  PerformanceHistoryGetRequestFailAction,
  PerformanceHistoryGetRequestSuccessAction,
} from './performance-history-get-request.actions';
import { SelectCustomerAction } from '../../../customer/customer.actions';
import { Injectable } from '@angular/core';

export interface PerformanceHistoryGetRequestStateModel extends IRequestsNestedState {}

@State<PerformanceHistoryGetRequestStateModel>({
  name: 'performanceHistoryGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class PerformanceHistoryGetRequestState {
  constructor(private apeironService: ApeironService) {}

  @Action(SelectCustomerAction)
  selectCustomer(ctx: StateContext<PerformanceHistoryGetRequestStateModel>, action: SelectCustomerAction) {
    ctx.patchState({
      loading: false,
      loaded: false,
      status: '',
      data: null,
    });
  }

  @Action(PerformanceHistoryGetRequestAction)
  performanceHistoryGetRequest(ctx: StateContext<PerformanceHistoryGetRequestStateModel>, action: PerformanceHistoryGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.apeironService.loadPerformanceHistoryRequest().pipe(
      switchMap((res: ApeironHistory[]) => {
        return ctx.dispatch(new PerformanceHistoryGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new PerformanceHistoryGetRequestFailAction(error));
      }),
    );
  }

  @Action(PerformanceHistoryGetRequestSuccessAction)
  performanceHistoryGetRequestSuccess(
    ctx: StateContext<PerformanceHistoryGetRequestStateModel>,
    action: PerformanceHistoryGetRequestSuccessAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadPerformanceHistorySuccessAction(action.payload));
  }

  @Action(PerformanceHistoryGetRequestFailAction)
  performanceHistoryGetRequestFail(
    ctx: StateContext<PerformanceHistoryGetRequestStateModel>,
    action: PerformanceHistoryGetRequestFailAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadPerformanceHistoryFailAction(action.payload));
  }
}
