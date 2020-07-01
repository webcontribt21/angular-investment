import { Selector } from '@ngxs/store';

import { CountriesGetRequestStateModel, CountriesGetRequestState } from './countries-get-request.state';

export class CountriesGetRequestGetterState {
  @Selector([CountriesGetRequestState])
  static getCountriesGetRequestState(state: CountriesGetRequestStateModel): CountriesGetRequestStateModel {
    return state;
  }
}
