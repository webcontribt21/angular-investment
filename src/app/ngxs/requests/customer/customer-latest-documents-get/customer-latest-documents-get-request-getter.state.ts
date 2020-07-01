import { Selector } from '@ngxs/store';
import {
  CustomerLatestDocumentsGetRequestState,
  CustomerLatestDocumentsGetRequestStateModel,
} from './customer-latest-documents-get-request.state';

export class CustomerLatestLatestDocumentsGetRequestGetterState {
  @Selector([CustomerLatestDocumentsGetRequestState])
  static getCustomerLatestDocumentsGetRequestState(
    state: CustomerLatestDocumentsGetRequestStateModel,
  ): CustomerLatestDocumentsGetRequestStateModel {
    return state;
  }
}
