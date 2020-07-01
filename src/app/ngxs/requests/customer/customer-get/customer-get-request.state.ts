import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { CustomerGetRequestAction, CustomerGetRequestFailAction, CustomerGetRequestSuccessAction } from './customer-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadCustomerFailAction, LoadCustomerSuccessAction } from '../../../customer/customer.actions';
import { CustomerService } from '../../../../core/services';
import { Injectable } from '@angular/core';

export interface CustomerGetRequestStateModel extends IRequestsNestedState {}

@State<CustomerGetRequestStateModel>({
  name: 'customerGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class CustomerGetRequestState {
  constructor(private customerService: CustomerService) {}

  @Action(CustomerGetRequestAction)
  customerGetRequest(ctx: StateContext<CustomerGetRequestStateModel>, action: CustomerGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.customerService.loadCustomerRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new CustomerGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new CustomerGetRequestFailAction(error));
      }),
    );
  }

  @Action(CustomerGetRequestSuccessAction)
  customerGetRequestSuccess(ctx: StateContext<CustomerGetRequestStateModel>, action: CustomerGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadCustomerSuccessAction(action.payload));
  }

  @Action(CustomerGetRequestFailAction)
  customerGetRequestFail(ctx: StateContext<CustomerGetRequestStateModel>, action: CustomerGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadCustomerFailAction(action.payload));
  }
}
