import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { OrdersPostRequestAction, OrdersPostRequestFailAction, OrdersPostRequestSuccessAction } from './orders-post-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { OrderService } from '../../../../core/services';
import { CreateOrderFailAction, CreateOrderSuccessAction } from '../../../order/order.actions';
import { Injectable } from '@angular/core';

export interface OrdersPostRequestStateModel extends IRequestsNestedState {}

@State<OrdersPostRequestStateModel>({
  name: 'ordersPostRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class OrdersPostRequestState {
  constructor(private orderService: OrderService) {}

  @Action(OrdersPostRequestAction)
  ordersPostRequest(ctx: StateContext<OrdersPostRequestStateModel>, action: OrdersPostRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.orderService.createOrderRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new OrdersPostRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new OrdersPostRequestFailAction(error));
      }),
    );
  }

  @Action(OrdersPostRequestSuccessAction)
  ordersPostRequestSuccess(ctx: StateContext<OrdersPostRequestStateModel>, action: OrdersPostRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new CreateOrderSuccessAction(action.payload));
  }

  @Action(OrdersPostRequestFailAction)
  ordersPostRequestFail(ctx: StateContext<OrdersPostRequestStateModel>, action: OrdersPostRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new CreateOrderFailAction(action.payload));
  }
}
