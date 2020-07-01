import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { OrdersGetRequestAction, OrdersGetRequestFailAction, OrdersGetRequestSuccessAction } from './orders-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { OrderService } from '../../../../core/services';
import { LoadOrdersFailAction, LoadOrdersSuccessAction } from '../../../order/order.actions';
import { Injectable } from '@angular/core';

export interface OrdersGetRequestStateModel extends IRequestsNestedState {}

@State<OrdersGetRequestStateModel>({
  name: 'ordersGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class OrdersGetRequestState {
  constructor(private orderService: OrderService) {}

  @Action(OrdersGetRequestAction)
  ordersGetRequest(ctx: StateContext<OrdersGetRequestStateModel>, action: OrdersGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.orderService.loadOrdersRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new OrdersGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new OrdersGetRequestFailAction(error));
      }),
    );
  }

  @Action(OrdersGetRequestSuccessAction)
  ordersGetRequestSuccess(ctx: StateContext<OrdersGetRequestStateModel>, action: OrdersGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadOrdersSuccessAction(action.payload));
  }

  @Action(OrdersGetRequestFailAction)
  ordersGetRequestFail(ctx: StateContext<OrdersGetRequestStateModel>, action: OrdersGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadOrdersFailAction(action.payload));
  }
}
