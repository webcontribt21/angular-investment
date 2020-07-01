import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { TransactionsSummary } from '../../../../core/models';
import { ApeironService } from '../../../../core/services';

import { LoadTransactionsSummaryFailAction, LoadTransactionsSummarySuccessAction } from '../../../apeiron/apeiron.actions';

import { IRequestsNestedState } from '../../requests.interface';

import {
  TransactionsSummaryGetRequestAction,
  TransactionsSummaryGetRequestFailAction,
  TransactionsSummaryGetRequestSuccessAction,
} from './transactions-summary-get-request.actions';
import { Injectable } from '@angular/core';

export interface TransactionsSummaryGetRequestStateModel extends IRequestsNestedState {}

@State<TransactionsSummaryGetRequestStateModel>({
  name: 'transactionsSummaryGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class TransactionsSummaryGetRequestState {
  constructor(private apeironService: ApeironService) {}

  @Action(TransactionsSummaryGetRequestAction)
  transactionsSummaryGetRequest(ctx: StateContext<TransactionsSummaryGetRequestStateModel>, action: TransactionsSummaryGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.apeironService.loadTransactionsSummaryRequest().pipe(
      switchMap((res: TransactionsSummary[]) => {
        return ctx.dispatch(new TransactionsSummaryGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new TransactionsSummaryGetRequestFailAction(error));
      }),
    );
  }

  @Action(TransactionsSummaryGetRequestSuccessAction)
  transactionsSummaryGetRequestSuccess(
    ctx: StateContext<TransactionsSummaryGetRequestStateModel>,
    action: TransactionsSummaryGetRequestSuccessAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadTransactionsSummarySuccessAction(action.payload));
  }

  @Action(TransactionsSummaryGetRequestFailAction)
  transactionsSummaryGetRequestFail(
    ctx: StateContext<TransactionsSummaryGetRequestStateModel>,
    action: TransactionsSummaryGetRequestFailAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadTransactionsSummaryFailAction(action.payload));
  }
}
