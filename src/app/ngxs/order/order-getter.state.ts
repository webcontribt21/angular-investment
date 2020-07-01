import { Selector } from '@ngxs/store';

import { OrderState, OrderStateModel } from './order.state';
import { Order, OrderConstraints, Pagination } from '../../core/models';
import { NgxsForm } from '../interfaces/ngxs-form.model';

export class OrderGetterState {
  @Selector([OrderState])
  static getOrders(state: OrderStateModel): Order[] {
    return state.ids.map(id => state.entities[id]);
  }

  @Selector([OrderState])
  static getOrdersPaging(state: OrderStateModel): Pagination {
    return state.ordersPagination;
  }

  @Selector([OrderState])
  static getReferenceAccountForm(state: OrderStateModel): NgxsForm {
    return state.referenceAccountOrderForm;
  }

  @Selector([OrderState])
  static getNewAddressForm(state: OrderStateModel): NgxsForm {
    return state.newAddressOrderForm;
  }

  @Selector([OrderState])
  static getTaxExemptionForm(state: OrderStateModel): NgxsForm {
    return state.taxExemptionForm;
  }

  @Selector([OrderState])
  static getOrderConstraints(state: OrderStateModel): OrderConstraints {
    return state.constraints;
  }
}
