import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { ApeironService } from '../../../../core/services';

import { IRequestsNestedState } from '../../requests.interface';
import { requestFailState, requestInitialState, requestLoadingState, requestSuccessState } from '../../../utils';
import {
  TransactionsGetRequestAction,
  TransactionsGetRequestFailedAction,
  TransactionsGetRequestSuccessAction,
} from './transactions-get-request.actions';
import { LoadTransactionsFailAction, LoadTransactionsSuccessAction } from '../../../apeiron/apeiron.actions';
import { Injectable } from '@angular/core';

export interface TransactionsGetRequestStateModel extends IRequestsNestedState {}

@State<TransactionsGetRequestStateModel>({
  name: 'transactionsGetRequestState',
  defaults: requestInitialState,
})
@Injectable()
export class TransactionsGetRequestState {
  constructor(private apeironService: ApeironService) {}

  @Action(TransactionsGetRequestAction)
  getTransactionsRequest(ctx: StateContext<TransactionsGetRequestStateModel>, action: TransactionsGetRequestAction) {
    ctx.patchState(requestLoadingState);

    return this.apeironService.loadTransactionsRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new TransactionsGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new TransactionsGetRequestFailedAction(error));
      }),
    );
  }

  @Action(TransactionsGetRequestSuccessAction)
  getTransactionsRequestSuccess(ctx: StateContext<TransactionsGetRequestStateModel>, action: TransactionsGetRequestSuccessAction) {
    ctx.patchState(requestSuccessState(action.payload));
    ctx.dispatch(new LoadTransactionsSuccessAction(action.payload));
  }

  @Action(TransactionsGetRequestFailedAction)
  getTransactionsRequestFailed(ctx: StateContext<TransactionsGetRequestStateModel>, action: TransactionsGetRequestFailedAction) {
    ctx.patchState(requestFailState(action.payload));
    ctx.dispatch(new LoadTransactionsFailAction(action.payload));
  }
}
