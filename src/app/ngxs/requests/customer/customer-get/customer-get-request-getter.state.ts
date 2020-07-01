import { Selector } from '@ngxs/store';

import { CustomerGetRequestStateModel, CustomerGetRequestState } from './customer-get-request.state';

export class CustomerGetRequestGetterState {
  @Selector([CustomerGetRequestState])
  static getCustomerGetRequestState(state: CustomerGetRequestStateModel): CustomerGetRequestStateModel {
    return state;
  }
}
