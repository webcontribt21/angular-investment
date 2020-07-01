import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { ApeironHistory } from '../../../../core/models';
import { ApeironService } from '../../../../core/services';

import { LoadBalanceHistoryFailAction, LoadBalanceHistorySuccessAction } from '../../../apeiron/apeiron.actions';

import { IRequestsNestedState } from '../../requests.interface';

import {
  BalanceHistoryGetRequestAction,
  BalanceHistoryGetRequestFailAction,
  BalanceHistoryGetRequestSuccessAction,
} from './balance-history-get-request.actions';
import { SelectCustomerAction } from '../../../customer/customer.actions';
import { Injectable } from '@angular/core';

export interface BalanceHistoryGetRequestStateModel extends IRequestsNestedState {}

@State<BalanceHistoryGetRequestStateModel>({
  name: 'balanceHistoryGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class BalanceHistoryGetRequestState {
  constructor(private apeironService: ApeironService) {}

  @Action(SelectCustomerAction)
  selectCustomer(ctx: StateContext<BalanceHistoryGetRequestStateModel>, action: SelectCustomerAction) {
    ctx.patchState({
      loading: false,
      loaded: false,
      status: '',
      data: null,
    });
  }

  @Action(BalanceHistoryGetRequestAction)
  balanceHistoryGetRequest(ctx: StateContext<BalanceHistoryGetRequestStateModel>, action: BalanceHistoryGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.apeironService.loadBalanceHistoryRequest().pipe(
      switchMap((res: ApeironHistory[]) => {
        return ctx.dispatch(new BalanceHistoryGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new BalanceHistoryGetRequestFailAction(error));
      }),
    );
  }

  @Action(BalanceHistoryGetRequestSuccessAction)
  balanceHistoryGetRequestSuccess(ctx: StateContext<BalanceHistoryGetRequestStateModel>, action: BalanceHistoryGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadBalanceHistorySuccessAction(action.payload));
  }

  @Action(BalanceHistoryGetRequestFailAction)
  balanceHistoryGetRequestFail(ctx: StateContext<BalanceHistoryGetRequestStateModel>, action: BalanceHistoryGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadBalanceHistoryFailAction(action.payload));
  }
}
