import { Selector } from '@ngxs/store';

import { OrdersPatchRequestStateModel, OrdersPatchRequestState } from './orders-patch-request.state';

export class OrdersPatchRequestGetterState {
  @Selector([OrdersPatchRequestState])
  static getOrdersPatchRequestState(state: OrdersPatchRequestStateModel): OrdersPatchRequestStateModel {
    return state;
  }
}
