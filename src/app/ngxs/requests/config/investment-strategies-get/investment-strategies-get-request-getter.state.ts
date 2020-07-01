import { Selector } from '@ngxs/store';

import { InvestmentStrategiesGetRequestStateModel, InvestmentStrategiesGetRequestState } from './investment-strategies-get-request.state';

export class InvestmentStrategiesGetRequestGetterState {
  @Selector([InvestmentStrategiesGetRequestState])
  static getInvestmentStrategiesGetRequestState(state: InvestmentStrategiesGetRequestStateModel): InvestmentStrategiesGetRequestStateModel {
    return state;
  }
}
