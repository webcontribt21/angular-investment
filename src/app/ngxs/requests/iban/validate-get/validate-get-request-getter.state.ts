import { Selector } from '@ngxs/store';

import { IbanValidateGetRequestStateModel, IbanValidateGetRequestState } from './validate-get-request.state';

export class IbanValidateGetRequestGetterState {
  @Selector([IbanValidateGetRequestState])
  static getIbanValidateGetRequestState(state: IbanValidateGetRequestStateModel): IbanValidateGetRequestStateModel {
    return state;
  }
}
