import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, pluck, switchMap, take } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import * as _ from 'lodash';

import { Customer, CustomerDocument, InvestmentStrategy, Pagination, StrategyToDisplay } from '../models';
import { ApplicationService } from './application.service';
import { ConfigService } from './config.service';

import {
  LoadCustomerAction,
  LoadCustomerDocumentsAction,
  LoadCustomerLatestDocumentsAction,
  SaveCustomerAction,
  SelectCustomerAction,
  LoadDefaultCustomerAction,
} from '../../ngxs/customer/customer.actions';
import { CustomerGetterState } from '../../ngxs/customer';
import { IRequestsNestedState } from '../../ngxs/requests/requests.interface';
import { SentryErrorHandler } from './error.handler';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  @Select(CustomerGetterState.getSelectedCustomer)
  selectedCustomer$: Observable<Customer>;

  @Select(CustomerGetterState.getCustomerDocuments)
  customerDocument$: Observable<CustomerDocument[]>;
  customerDocumentsGetRequestState$: Observable<IRequestsNestedState>;

  @Select(CustomerGetterState.getCustomerDocumentsPaging)
  documentsPaging$: Observable<Pagination>;

  @Select(CustomerGetterState.getCustomerLatestDocuments)
  latestDocuments$: Observable<CustomerDocument[]>;
  customerLatestDocumentsGetRequestState$: Observable<IRequestsNestedState>;

  customerPatchRequestState$: Observable<IRequestsNestedState>;

  investmentStrategy$: Observable<InvestmentStrategy>;
  strategyToDisplay$: Observable<StrategyToDisplay>;

  constructor(
    private store: Store,
    private httpClient: HttpClient,
    private applicationService: ApplicationService,
    private configService: ConfigService,
  ) {
    this.customerDocumentsGetRequestState$ = this.store.select(state => state.requests.customerDocumentsGetRequestState);
    this.customerLatestDocumentsGetRequestState$ = this.store.select(state => state.requests.customerLatestDocumentsGetRequestState);
    this.customerPatchRequestState$ = this.store.select(state => state.requests.customerPatchRequestState);

    this.investmentStrategy$ = this.selectedCustomer$.pipe(
      filter(res => !!res),
      pluck('currentInvestmentStrategy'),
      this.configService.getStrategyByCode(),
    );

    this.strategyToDisplay$ = this.investmentStrategy$.pipe(this.configService.strategyToDisplay());
  }

  loadDefaultCustomer(customerId: string, allowedIds: string[]) {
    this.store.dispatch(new LoadDefaultCustomerAction({ customerId, otherIds: allowedIds }));
  }

  loadCustomer(customerId: string) {
    this.store.dispatch(new LoadCustomerAction(customerId));
  }

  loadCustomerRequest(customerId: string) {
    return this.httpClient.get('customers/v2/' + customerId);
  }

  selectCustomer(customerId: string) {
    SentryErrorHandler.configureScope(scope => scope.setTag('customer', customerId));
    this.store.dispatch(new SelectCustomerAction(customerId));
  }

  loadCustomerDocuments(offset: number = 0, filterKey?: string): Observable<CustomerDocument[]> {
    const requestData = {
      offset,
      ...(filterKey ? { filterKey } : {}),
    };
    this.store.dispatch(new LoadCustomerDocumentsAction(requestData));
    return this.customerDocument$;
  }

  loadCustomerDocumentsRequest({ offset, filterKey }) {
    return this.selectedCustomer$.pipe(
      filter(res => !!res),
      take(1),
      switchMap((customer: Customer) => {
        return this.httpClient.get('customers/v2/' + customer.id + '/inbox-documents', {
          params: {
            offset: offset.toString(),
            limit: this.applicationService.paginationLimit.documents.toString(),
            ...(filterKey ? { filter: filterKey } : {}),
          },
        });
      }),
    );
  }

  loadCustomerLatestDocument() {
    this.store.dispatch(new LoadCustomerLatestDocumentsAction());
  }

  saveCustomer(data) {
    this.store.dispatch(new SaveCustomerAction(data));
  }

  saveCustomerRequest(data) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json-patch+json');
    const body = data;

    return this.selectedCustomer$.pipe(
      filter(res => !!res),
      take(1),
      switchMap((customer: Customer) => {
        return this.httpClient.patch('customers/v2/' + customer.id, body, { headers });
      }),
    );
  }
}
