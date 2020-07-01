import { Selector } from '@ngxs/store';
import { CustomerDocumentsGetRequestState, CustomerDocumentsGetRequestStateModel } from './customer-documents-get-request.state';

export class CustomerDocumentsGetRequestGetterState {
  @Selector([CustomerDocumentsGetRequestState])
  static getCustomerDocumentsGetRequestState(state: CustomerDocumentsGetRequestStateModel): CustomerDocumentsGetRequestStateModel {
    return state;
  }
}
