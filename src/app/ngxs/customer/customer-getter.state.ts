import { Selector } from '@ngxs/store';

import { CustomerState, CustomerStateModel } from './customer.state';
import { Customer, CustomerDocument } from '../../core/models';

export class CustomerGetterState {
  @Selector([CustomerState])
  static getSelectedCustomer(state: CustomerStateModel): Customer {
    return state.entities[state.selectedCustomerId];
  }

  @Selector([CustomerState])
  static getCustomerDocuments(state: CustomerStateModel): CustomerDocument[] {
    return state.documents;
  }

  @Selector([CustomerState])
  static getCustomerDocumentsPaging(state: CustomerStateModel): { totalCount: number; offset: number } {
    return state.documentsPagination;
  }

  @Selector([CustomerState])
  static getCustomerLatestDocuments(state: CustomerStateModel): CustomerDocument[] {
    return state.latestDocuments;
  }
}
