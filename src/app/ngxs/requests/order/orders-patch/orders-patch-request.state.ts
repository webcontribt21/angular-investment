import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { OrdersPatchRequestAction, OrdersPatchRequestFailAction, OrdersPatchRequestSuccessAction } from './orders-patch-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { OrderService } from '../../../../core/services';
import { PatchOrderFailAction, PatchOrderSuccessAction } from '../../../order/order.actions';
import { Injectable } from '@angular/core';

export interface OrdersPatchRequestStateModel extends IRequestsNestedState {}

@State<OrdersPatchRequestStateModel>({
  name: 'ordersPatchRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class OrdersPatchRequestState {
  constructor(private orderService: OrderService) {}

  @Action(OrdersPatchRequestAction)
  ordersPatchRequest(ctx: StateContext<OrdersPatchRequestStateModel>, action: OrdersPatchRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.orderService.patchOrderRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new OrdersPatchRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new OrdersPatchRequestFailAction(error));
      }),
    );
  }

  @Action(OrdersPatchRequestSuccessAction)
  ordersPatchRequestSuccess(ctx: StateContext<OrdersPatchRequestStateModel>, action: OrdersPatchRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new PatchOrderSuccessAction(action.payload));
  }

  @Action(OrdersPatchRequestFailAction)
  ordersPatchRequestFail(ctx: StateContext<OrdersPatchRequestStateModel>, action: OrdersPatchRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new PatchOrderFailAction(action.payload));
  }
}
