import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  CustomerLatestDocumentsGetRequestAction,
  CustomerLatestDocumentsGetRequestFailAction,
  CustomerLatestDocumentsGetRequestSuccessAction,
} from './customer-latest-documents-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { CustomerService } from '../../../../core/services';
import {
  LoadCustomerLatestDocumentsFailAction,
  LoadCustomerLatestDocumentsSuccessAction,
  SelectCustomerAction,
} from '../../../customer/customer.actions';
import { Injectable } from '@angular/core';

export interface CustomerLatestDocumentsGetRequestStateModel extends IRequestsNestedState {}

@State<CustomerLatestDocumentsGetRequestStateModel>({
  name: 'customerLatestDocumentsGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class CustomerLatestDocumentsGetRequestState {
  constructor(private customerService: CustomerService) {}

  @Action(SelectCustomerAction)
  selectCustomer(ctx: StateContext<CustomerLatestDocumentsGetRequestStateModel>, action: SelectCustomerAction) {
    ctx.patchState({
      loading: false,
      loaded: false,
      status: '',
      data: null,
    });
  }

  @Action(CustomerLatestDocumentsGetRequestAction)
  customerLatestDocumentsGetRequest(
    ctx: StateContext<CustomerLatestDocumentsGetRequestStateModel>,
    action: CustomerLatestDocumentsGetRequestAction,
  ) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.customerService.loadCustomerDocumentsRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new CustomerLatestDocumentsGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new CustomerLatestDocumentsGetRequestFailAction(error));
      }),
    );
  }

  @Action(CustomerLatestDocumentsGetRequestSuccessAction)
  customerLatestDocumentsGetRequestSuccess(
    ctx: StateContext<CustomerLatestDocumentsGetRequestStateModel>,
    action: CustomerLatestDocumentsGetRequestSuccessAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadCustomerLatestDocumentsSuccessAction(action.payload));
  }

  @Action(CustomerLatestDocumentsGetRequestFailAction)
  customerLatestDocumentsGetRequestFail(
    ctx: StateContext<CustomerLatestDocumentsGetRequestStateModel>,
    action: CustomerLatestDocumentsGetRequestFailAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadCustomerLatestDocumentsFailAction(action.payload));
  }
}
