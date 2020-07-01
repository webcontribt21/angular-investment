import { IRequestsNestedState } from '../../requests.interface';
import { Action, State, StateContext } from '@ngxs/store';
import { ConfigService } from '../../../../core/services';
import {
  TransactionCategoriesGetRequestAction,
  TransactionCategoriesGetRequestFailAction,
  TransactionCategoriesGetRequestSuccessAction,
} from './transaction-categories-get.actions';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { LoadTransactionCategoriesFailAction, LoadTransactionCategoriesSuccessAction } from '../../../config/config.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface TransactionCategoriesGetRequestStateModel extends IRequestsNestedState {}

@State<TransactionCategoriesGetRequestStateModel>({
  name: 'transactionCategoriesGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class TransactionCategoriesGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(TransactionCategoriesGetRequestAction)
  transactionCategoriesGetRequest(ctx: StateContext<TransactionCategoriesGetRequestStateModel>) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.transactionCategories).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new TransactionCategoriesGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new TransactionCategoriesGetRequestFailAction(error));
      }),
    );
  }

  @Action(TransactionCategoriesGetRequestSuccessAction)
  transactionCategoriesGetRequestSuccess(
    ctx: StateContext<TransactionCategoriesGetRequestStateModel>,
    action: TransactionCategoriesGetRequestSuccessAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadTransactionCategoriesSuccessAction(action.payload));
  }

  @Action(TransactionCategoriesGetRequestFailAction)
  transactionCategoriesGetRequestFail(
    ctx: StateContext<TransactionCategoriesGetRequestStateModel>,
    action: TransactionCategoriesGetRequestFailAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadTransactionCategoriesFailAction(action.payload));
  }
}
