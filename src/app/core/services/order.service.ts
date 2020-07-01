import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';

import { Customer, Order, OrderConstraints, Pagination } from '../models';
import { CustomerService } from './customer.service';
import { ApplicationService } from './application.service';
import { OrderStatusEnum } from '../enums/order-status.enum';

import { OrderGetterState } from '../../ngxs/order';
import { NgxsForm } from '../../ngxs/interfaces/ngxs-form.model';
import { IRequestsNestedState } from '../../ngxs/requests/requests.interface';
import {
  ClearNewAddressFormAction,
  ClearTaxExemptionFormAction,
  CreateOrderAction,
  LoadOrderConstraintsAction,
  LoadOrdersAction,
  PatchOrderAction,
  ClearReferenceAccountFormAction,
} from '../../ngxs/order/order.actions';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  @Select(OrderGetterState.getOrders)
  orders$: Observable<Order[]>;

  @Select(OrderGetterState.getOrdersPaging)
  ordersPagination$: Observable<Pagination>;
  ordersGetRequestState$: Observable<IRequestsNestedState>;

  @Select(OrderGetterState.getReferenceAccountForm)
  referenceAccountFormValue$: Observable<NgxsForm>;

  @Select(OrderGetterState.getNewAddressForm)
  newAddressFormValue$: Observable<NgxsForm>;

  @Select(OrderGetterState.getTaxExemptionForm)
  taxExemptionFormValue$: Observable<NgxsForm>;

  @Select(OrderGetterState.getOrderConstraints)
  orderConstraints$: Observable<OrderConstraints>;

  constructor(
    private store: Store,
    private httpClient: HttpClient,
    private customerService: CustomerService,
    private applicationService: ApplicationService,
  ) {
    this.ordersGetRequestState$ = this.store.select(state => state.requests.ordersGetRequestState);
  }

  loadOrders(offset = 0) {
    this.store.dispatch(new LoadOrdersAction(offset));
  }

  loadOrdersRequest(offset: number) {
    return this.customerService.selectedCustomer$.pipe(
      filter(res => !!res),
      take(1),
      switchMap((selectedCustomer: Customer) => {
        return this.httpClient.get('customers/v2/' + selectedCustomer.id + '/orders', {
          params: {
            offset: offset.toString(),
            limit: this.applicationService.paginationLimit.documents.toString(),
          },
        });
      }),
    );
  }

  createOrder(order: any) {
    this.store.dispatch(new CreateOrderAction(order));
  }

  createOrderRequest(order) {
    return this.customerService.selectedCustomer$.pipe(
      filter(res => !!res),
      take(1),
      switchMap((selectedCustomer: Customer) => {
        return this.httpClient.post('customers/v2/' + selectedCustomer.id + '/orders', order);
      }),
    );
  }

  patchOrder(orderId: string) {
    this.store.dispatch(new PatchOrderAction(orderId));
  }

  patchOrderRequest(orderId: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json-patch+json');
    const body = [{ op: 'replace', path: '/status', value: `${OrderStatusEnum.canceled}` }];

    return this.customerService.selectedCustomer$.pipe(
      filter(res => !!res),
      take(1),
      switchMap((selectedCustomer: Customer) => {
        return this.httpClient.patch('customers/v2/' + selectedCustomer.id + '/orders/' + orderId, body, { headers });
      }),
    );
  }

  clearReferenceAccountForm() {
    this.store.dispatch(new ClearReferenceAccountFormAction());
  }

  clearNewAddressForm() {
    this.store.dispatch(new ClearNewAddressFormAction());
  }

  clearTaxExemptionForm() {
    this.store.dispatch(new ClearTaxExemptionFormAction());
  }

  loadOrderConstraints() {
    this.store.dispatch(new LoadOrderConstraintsAction());
  }

  loadOrderConstraintsRequest(payload?) {
    return this.customerService.selectedCustomer$.pipe(
      filter(res => !!res),
      take(1),
      switchMap((selectedCustomer: Customer) => {
        return this.httpClient.get('customers/v2/' + selectedCustomer.id + '/order-constraints');
      }),
    );
  }
}
