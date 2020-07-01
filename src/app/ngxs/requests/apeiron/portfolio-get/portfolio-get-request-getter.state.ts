import { Selector } from '@ngxs/store';

import { PortfolioGetRequestStateModel } from './portfolio-get-request.state';

export class PortfolioGetRequestGetterState {
  @Selector()
  static getApeironGetPortfolioState(state: PortfolioGetRequestStateModel): PortfolioGetRequestStateModel {
    return state;
  }
}
