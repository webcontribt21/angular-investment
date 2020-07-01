import { Selector } from '@ngxs/store';

import { CustomerPatchRequestStateModel, CustomerPatchRequestState } from './customer-patch-request.state';

export class CustomerPatchRequestGetterState {
  @Selector([CustomerPatchRequestState])
  static getCustomerPatchRequestState(state: CustomerPatchRequestStateModel): CustomerPatchRequestStateModel {
    return state;
  }
}
