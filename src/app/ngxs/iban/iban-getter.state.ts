import { Selector } from '@ngxs/store';

import { IbanState, IbanStateModel } from './iban.state';
import { ValidatedIban } from '../../core/models';

export class IbanGetterState {
  @Selector([IbanState])
  static getIbanState(state: IbanStateModel): IbanStateModel {
    return state;
  }

  @Selector([IbanState])
  static getIbans(state: IbanStateModel): ValidatedIban[] {
    return state.ibans;
  }
}
