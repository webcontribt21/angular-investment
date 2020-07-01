import { Action, State, StateContext, NgxsOnInit } from '@ngxs/store';

import { Customer, CustomerDocument, Pagination } from '../../core/models';
import { ApplicationService } from '../../core/services/application.service';

import {
  SelectCustomerAction,
  ClearSelectedCustomerAction,
  LoadCustomerAction,
  LoadDefaultCustomerAction,
  LoadCustomerSuccessAction,
  LoadCustomerDocumentsAction,
  LoadCustomerDocumentsSuccessAction,
  LoadCustomerLatestDocumentsAction,
  LoadCustomerLatestDocumentsSuccessAction,
  SaveCustomerAction,
  SaveCustomerSuccessAction,
} from './customer.actions';
import { CustomerGetRequestAction } from '../requests/customer/customer-get/customer-get-request.actions';
import { CustomerDocumentsGetRequestAction } from '../requests/customer/customer-documents-get/customer-documents-get-request.actions';
import { CustomerLatestDocumentsGetRequestAction } from '../requests/customer/customer-latest-documents-get/customer-latest-documents-get-request.actions';
import { LoadOrderConstraintsAction } from '../order/order.actions';
import { CustomerPatchRequestAction } from '../requests/customer/customer-patch/customer-patch-request.actions';
import { LoadPortfolioAction, LoadPortfolioPerformanceAction } from '../apeiron/apeiron.actions';
import { Injectable } from '@angular/core';

export interface CustomerStateModel {
  entities: { [key: string]: Customer };
  ids: string[];
  selectedCustomerId: string;
  documents: CustomerDocument[];
  latestDocuments: CustomerDocument[];
  documentsPagination: Pagination;
}

@State<CustomerStateModel>({
  name: 'customer',
  defaults: {
    entities: {},
    ids: [],
    selectedCustomerId: null,
    documents: [],
    latestDocuments: [],
    documentsPagination: {
      totalCount: 0,
      offset: 0,
      limit: 0,
    },
  },
})
@Injectable()
export class CustomerState implements NgxsOnInit {
  constructor(private applicationService: ApplicationService) {}

  ngxsOnInit(ctx: StateContext<CustomerStateModel>) {
    ctx.patchState({
      documentsPagination: {
        ...ctx.getState().documentsPagination,
        limit: this.applicationService.paginationLimit.documents,
      },
    });
  }

  @Action(LoadDefaultCustomerAction)
  loadDefaultCustomer(ctx: StateContext<CustomerStateModel>, action: LoadDefaultCustomerAction) {
    const state = ctx.getState();
    const allowedIds = [].concat(action.payload.customerId).concat(action.payload.otherIds);
    const customerId = allowedIds.indexOf(state.selectedCustomerId) >= 0 ? state.selectedCustomerId : action.payload.customerId;
    ctx.dispatch(new CustomerGetRequestAction(customerId));
  }

  @Action(LoadCustomerAction)
  loadCustomer(ctx: StateContext<CustomerStateModel>, action: LoadCustomerAction) {
    ctx.dispatch(new CustomerGetRequestAction(action.payload));
  }

  @Action(LoadCustomerSuccessAction)
  loadCustomerSuccess(ctx: StateContext<CustomerStateModel>, action: LoadCustomerSuccessAction) {
    const customer = new Customer(action.payload);
    ctx.patchState({
      ids: [...ctx.getState().ids, customer.id],
      entities: {
        ...ctx.getState().entities,
        [customer.id]: customer,
      },
    });

    ctx.dispatch([
      new SelectCustomerAction(customer.id),
      new LoadOrderConstraintsAction(),
      new LoadPortfolioAction(),
      new LoadPortfolioPerformanceAction(),
    ]);
  }

  @Action(SelectCustomerAction)
  selectCustomer(ctx: StateContext<CustomerStateModel>, action: SelectCustomerAction) {
    ctx.patchState({
      selectedCustomerId: action.payload,
    });
  }

  @Action(ClearSelectedCustomerAction)
  clearSelectedCustomer(ctx: StateContext<CustomerStateModel>, action: ClearSelectedCustomerAction) {
    ctx.patchState({
      selectedCustomerId: null,
    });
  }

  @Action(LoadCustomerDocumentsAction)
  loadCustomerDocuments(ctx: StateContext<CustomerStateModel>, action: LoadCustomerDocumentsAction) {
    const state = ctx.getState();
    ctx.dispatch(new CustomerDocumentsGetRequestAction(action.payload));
    ctx.patchState({
      documentsPagination: {
        ...state.documentsPagination,
        offset: action.payload.offset,
        filter: action.payload.filterKey || null,
      },
    });
  }

  @Action(LoadCustomerDocumentsSuccessAction)
  loadCustomerDocumentsSuccess(ctx: StateContext<CustomerStateModel>, action: LoadCustomerDocumentsSuccessAction) {
    const state = ctx.getState();
    ctx.patchState({
      documents: action.payload.items,
      documentsPagination: {
        ...state.documentsPagination,
        totalCount: action.payload.totalCount,
      },
    });
  }

  @Action(LoadCustomerLatestDocumentsAction)
  loadCustomerLatestDocuments(ctx: StateContext<CustomerStateModel>, action: LoadCustomerDocumentsAction) {
    ctx.dispatch(
      new CustomerLatestDocumentsGetRequestAction({
        offset: 0,
        filterKey: 'latest',
      }),
    );
  }

  @Action(LoadCustomerLatestDocumentsSuccessAction)
  loadCustomerLatestDocumentsSuccess(ctx: StateContext<CustomerStateModel>, action: LoadCustomerDocumentsSuccessAction) {
    ctx.patchState({
      latestDocuments: action.payload.items,
    });
  }

  @Action(SaveCustomerAction)
  saveCustomer(ctx: StateContext<CustomerStateModel>, action: SaveCustomerAction) {
    ctx.dispatch(new CustomerPatchRequestAction(action.payload));
  }

  @Action(SaveCustomerSuccessAction)
  saveCustomerSuccess(ctx: StateContext<CustomerStateModel>, action: SaveCustomerSuccessAction) {
    const customer = new Customer(action.payload);
    ctx.patchState({
      entities: {
        ...ctx.getState().entities,
        [customer.id]: customer,
      },
    });
  }
}
