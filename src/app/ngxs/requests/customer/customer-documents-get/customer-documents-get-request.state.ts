import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  CustomerDocumentsGetRequestAction,
  CustomerDocumentsGetRequestFailAction,
  CustomerDocumentsGetRequestSuccessAction,
} from './customer-documents-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { CustomerService } from '../../../../core/services';
import { LoadCustomerDocumentsFailAction, LoadCustomerDocumentsSuccessAction } from '../../../customer/customer.actions';
import { Injectable } from '@angular/core';

export interface CustomerDocumentsGetRequestStateModel extends IRequestsNestedState {}

@State<CustomerDocumentsGetRequestStateModel>({
  name: 'customerDocumentsGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class CustomerDocumentsGetRequestState {
  constructor(private customerService: CustomerService) {}

  @Action(CustomerDocumentsGetRequestAction)
  customerDocumentsGetRequest(ctx: StateContext<CustomerDocumentsGetRequestStateModel>, action: CustomerDocumentsGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.customerService.loadCustomerDocumentsRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new CustomerDocumentsGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new CustomerDocumentsGetRequestFailAction(error));
      }),
    );
  }

  @Action(CustomerDocumentsGetRequestSuccessAction)
  customerDocumentsGetRequestSuccess(
    ctx: StateContext<CustomerDocumentsGetRequestStateModel>,
    action: CustomerDocumentsGetRequestSuccessAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadCustomerDocumentsSuccessAction(action.payload));
  }

  @Action(CustomerDocumentsGetRequestFailAction)
  customerDocumentsGetRequestFail(ctx: StateContext<CustomerDocumentsGetRequestStateModel>, action: CustomerDocumentsGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadCustomerDocumentsFailAction(action.payload));
  }
}
