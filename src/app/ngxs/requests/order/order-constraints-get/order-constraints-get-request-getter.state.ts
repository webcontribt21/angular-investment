import { Selector } from '@ngxs/store';

import { OrderConstraintsGetRequestStateModel, OrderConstraintsGetRequestState } from './order-constraints-get-request.state';

export class OrderConstraintsGetRequestGetterState {
  @Selector([OrderConstraintsGetRequestState])
  static getOrderConstraintsGetRequestState(state: OrderConstraintsGetRequestStateModel): OrderConstraintsGetRequestStateModel {
    return state;
  }
}
