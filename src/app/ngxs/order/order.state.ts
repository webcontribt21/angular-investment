import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';

import { Navigate } from '@ngxs/router-plugin';

import { Order, OrderConstraints, Pagination } from '../../core/models';
import { ApplicationService } from '../../core/services/application.service';
import { I18nService } from '../../core/services/i18n.service';

import { updateEntities } from '../utils';
import { OrdersGetRequestAction } from '../requests/order/orders-get/orders-get-request.actions';
import { OrdersPostRequestAction } from '../requests/order/orders-post/orders-post-request.actions';

import {
  ClearNewAddressFormAction,
  ClearTaxExemptionFormAction,
  CreateOrderAction,
  CreateOrderSuccessAction,
  LoadOrderConstraintsAction,
  LoadOrderConstraintsSuccessAction,
  LoadOrdersAction,
  LoadOrdersSuccessAction,
  PatchOrderAction,
  PatchOrderSuccessAction,
  ClearReferenceAccountFormAction,
} from './order.actions';
import { OrdersPatchRequestAction } from '../requests/order/orders-patch/orders-patch-request.actions';
import { NgxsForm } from '../interfaces/ngxs-form.model';
import { OrderConstraintsGetRequestAction } from '../requests/order/order-constraints-get/order-constraints-get-request.actions';
import { tap, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface OrderStateModel {
  entities: { [key: string]: Order };
  ids: string[];
  ordersPagination: Pagination;
  referenceAccountOrderForm: NgxsForm;
  newAddressOrderForm: NgxsForm;
  taxExemptionForm: NgxsForm;
  constraints: OrderConstraints;
}

@State<OrderStateModel>({
  name: 'order',
  defaults: {
    entities: {},
    ids: [],
    ordersPagination: {
      totalCount: 0,
      offset: 0,
      limit: 0,
    },
    referenceAccountOrderForm: new NgxsForm(),
    newAddressOrderForm: new NgxsForm(),
    taxExemptionForm: new NgxsForm(),
    constraints: null,
  },
})
@Injectable()
export class OrderState implements NgxsOnInit {
  constructor(private applicationService: ApplicationService, private i18nService: I18nService) {}

  ngxsOnInit(ctx: StateContext<OrderStateModel>) {
    ctx.patchState({
      ordersPagination: {
        ...ctx.getState().ordersPagination,
        limit: this.applicationService.paginationLimit.orders,
      },
    });
  }

  @Action(LoadOrdersAction)
  loadOrders(ctx: StateContext<OrderStateModel>, action: LoadOrdersAction) {
    ctx.dispatch(new OrdersGetRequestAction(action.payload));
    const state = ctx.getState();
    ctx.patchState({
      ordersPagination: {
        ...state.ordersPagination,
        offset: action.payload,
      },
    });
  }

  @Action(LoadOrdersSuccessAction)
  loadOrdersSuccess(ctx: StateContext<OrderStateModel>, action: LoadOrdersSuccessAction) {
    const stateUpdate = updateEntities(action.payload.items, Order);
    const state = ctx.getState();
    ctx.patchState({
      entities: stateUpdate.entities,
      ids: stateUpdate.ids,
      ordersPagination: {
        ...state.ordersPagination,
        totalCount: action.payload.totalCount,
      },
    });
  }

  @Action(CreateOrderAction)
  createOrder(ctx: StateContext<OrderStateModel>, action: CreateOrderAction) {
    ctx.dispatch(new OrdersPostRequestAction(action.payload));
  }

  @Action(CreateOrderSuccessAction)
  createOrderSuccess(ctx: StateContext<OrderStateModel>, action: CreateOrderSuccessAction) {
    const stateUpdate = updateEntities(action.payload, Order);
    ctx.patchState({
      entities: {
        ...ctx.getState().entities,
        ...stateUpdate.entities,
      },
      ids: [...ctx.getState().ids, ...stateUpdate.ids],
    });
    ctx.dispatch([new Navigate(['orders']), new LoadOrderConstraintsAction()]);

    return this.i18nService.getTranslationByKeys(['ORDERS_PAGE.YOUR_ORDER_IS_SUBMITTED_SUCCESSFULLY']).pipe(
      first(),
      tap(([{ label }]) => {
        this.applicationService.showToastr(label);
      }),
    );
  }

  @Action(PatchOrderAction)
  patchOrder(ctx: StateContext<OrderStateModel>, action: PatchOrderAction) {
    ctx.dispatch(new OrdersPatchRequestAction(action.payload));
  }

  @Action(PatchOrderSuccessAction)
  patchOrderSuccess(ctx: StateContext<OrderStateModel>, action: PatchOrderSuccessAction) {
    ctx.patchState({
      entities: {
        ...ctx.getState().entities,
        [action.payload.id]: action.payload,
      },
    });
    ctx.dispatch([new Navigate(['orders']), new LoadOrderConstraintsAction()]);

    return this.i18nService.getTranslationByKeys(['ORDERS_PAGE.YOUR_ORDER_IS_CANCELLED_SUCCESSFULLY']).pipe(
      first(),
      tap(([{ label }]) => {
        this.applicationService.showToastr(label);
      }),
    );
  }

  @Action(ClearReferenceAccountFormAction)
  clearReferenceAccountForm(ctx: StateContext<OrderStateModel>, action: ClearReferenceAccountFormAction) {
    ctx.patchState({
      referenceAccountOrderForm: new NgxsForm(),
    });
  }

  @Action(ClearNewAddressFormAction)
  clearNewAddressForm(ctx: StateContext<OrderStateModel>, action: ClearNewAddressFormAction) {
    ctx.patchState({
      newAddressOrderForm: new NgxsForm(),
    });
  }

  @Action(ClearTaxExemptionFormAction)
  clearTaxExemptionForm(ctx: StateContext<OrderStateModel>, action: ClearTaxExemptionFormAction) {
    ctx.patchState({
      taxExemptionForm: new NgxsForm(),
    });
  }

  @Action(LoadOrderConstraintsAction)
  loadOrderConstraints(ctx: StateContext<OrderStateModel>, action: LoadOrderConstraintsAction) {
    ctx.dispatch(new OrderConstraintsGetRequestAction(action.payload));
  }

  @Action(LoadOrderConstraintsSuccessAction)
  loadOrderConstraintsSuccess(ctx: StateContext<OrderStateModel>, action: LoadOrderConstraintsSuccessAction) {
    const constraints = new OrderConstraints(action.payload);
    ctx.patchState({
      constraints,
    });
  }
}
