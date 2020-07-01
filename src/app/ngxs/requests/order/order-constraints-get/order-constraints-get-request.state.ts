import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  OrderConstraintsGetRequestAction,
  OrderConstraintsGetRequestFailAction,
  OrderConstraintsGetRequestSuccessAction,
} from './order-constraints-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { OrderService } from '../../../../core/services';
import { LoadOrderConstraintsFailAction, LoadOrderConstraintsSuccessAction } from '../../../order/order.actions';
import { Injectable } from '@angular/core';

export interface OrderConstraintsGetRequestStateModel extends IRequestsNestedState {}

@State<OrderConstraintsGetRequestStateModel>({
  name: 'orderConstraintsGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class OrderConstraintsGetRequestState {
  constructor(private orderService: OrderService) {}

  @Action(OrderConstraintsGetRequestAction)
  orderConstraintsGetRequest(ctx: StateContext<OrderConstraintsGetRequestStateModel>, action: OrderConstraintsGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.orderService.loadOrderConstraintsRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new OrderConstraintsGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new OrderConstraintsGetRequestFailAction(error));
      }),
    );
  }

  @Action(OrderConstraintsGetRequestSuccessAction)
  orderConstraintsGetRequestSuccess(
    ctx: StateContext<OrderConstraintsGetRequestStateModel>,
    action: OrderConstraintsGetRequestSuccessAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadOrderConstraintsSuccessAction(action.payload));
  }

  @Action(OrderConstraintsGetRequestFailAction)
  orderConstraintsGetRequestFail(ctx: StateContext<OrderConstraintsGetRequestStateModel>, action: OrderConstraintsGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadOrderConstraintsFailAction(action.payload));
  }
}
