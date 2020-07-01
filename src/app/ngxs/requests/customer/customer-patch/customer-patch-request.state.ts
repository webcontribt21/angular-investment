import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  CustomerPatchRequestAction,
  CustomerPatchRequestFailAction,
  CustomerPatchRequestSuccessAction,
} from './customer-patch-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { CustomerService } from '../../../../core/services';
import { SaveCustomerFailAction, SaveCustomerSuccessAction } from '../../../customer/customer.actions';
import { Injectable } from '@angular/core';

export interface CustomerPatchRequestStateModel extends IRequestsNestedState {}

@State<CustomerPatchRequestStateModel>({
  name: 'customerPatchRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class CustomerPatchRequestState {
  constructor(private customerService: CustomerService) {}

  @Action(CustomerPatchRequestAction)
  customerPatchRequest(ctx: StateContext<CustomerPatchRequestStateModel>, action: CustomerPatchRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.customerService.saveCustomerRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new CustomerPatchRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new CustomerPatchRequestFailAction(error));
      }),
    );
  }

  @Action(CustomerPatchRequestSuccessAction)
  customerPatchRequestSuccess(ctx: StateContext<CustomerPatchRequestStateModel>, action: CustomerPatchRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new SaveCustomerSuccessAction(action.payload));
  }

  @Action(CustomerPatchRequestFailAction)
  customerPatchRequestFail(ctx: StateContext<CustomerPatchRequestStateModel>, action: CustomerPatchRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new SaveCustomerFailAction(action.payload));
  }
}
