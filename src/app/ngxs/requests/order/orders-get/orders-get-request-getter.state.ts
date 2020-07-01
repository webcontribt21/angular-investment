import { Selector } from '@ngxs/store';

import { OrdersGetRequestStateModel, OrdersGetRequestState } from './orders-get-request.state';

export class OrdersGetRequestGetterState {
  @Selector([OrdersGetRequestState])
  static getOrdersGetRequestState(state: OrdersGetRequestStateModel): OrdersGetRequestStateModel {
    return state;
  }
}
