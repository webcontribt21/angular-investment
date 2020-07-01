import { Selector } from '@ngxs/store';

import { OrdersPostRequestStateModel, OrdersPostRequestState } from './orders-post-request.state';

export class OrdersPostRequestGetterState {
  @Selector([OrdersPostRequestState])
  static getOrdersPostRequestState(state: OrdersPostRequestStateModel): OrdersPostRequestStateModel {
    return state;
  }
}
