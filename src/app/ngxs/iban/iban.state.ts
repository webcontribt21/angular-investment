import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';

import { ValidateIbanAction, ValidateIbanSuccessAction } from './iban.actions';
import { ApplicationService } from '../../core/services/application.service';
import { IbanValidateGetRequestAction } from '../requests/iban/validate-get/validate-get-request.actions';
import { ValidatedIban } from '../../core/models';
import { Injectable } from '@angular/core';

export interface IbanStateModel {
  ibans: ValidatedIban[];
}

@State<IbanStateModel>({
  name: 'iban',
  defaults: {
    ibans: [],
  },
})
@Injectable()
export class IbanState implements NgxsOnInit {
  constructor(private applicationService: ApplicationService, private store: Store) {}

  ngxsOnInit(ctx: StateContext<IbanStateModel>) {}

  @Action(ValidateIbanAction)
  validateIban(ctx: StateContext<IbanStateModel>, action: ValidateIbanAction) {
    ctx.dispatch(new IbanValidateGetRequestAction(action.payload));
  }

  @Action(ValidateIbanSuccessAction)
  validateIbanSuccess(ctx: StateContext<IbanStateModel>, action: ValidateIbanSuccessAction) {
    const validBank =
      action.payload.valid &&
      action.payload.checkResults &&
      action.payload.checkResults.bankCode &&
      !!action.payload.bankData &&
      !!action.payload.bankData.bic &&
      !!action.payload.bankData.name;
    const valid = action.payload.valid;
    const ibans = ctx.getState().ibans;
    const validatedIban: ValidatedIban = {
      valid,
      iban: action.payload.iban,
      bankData: action.payload.bankData,
      validBank,
    };
    ctx.patchState({
      ibans: [validatedIban].concat(ibans),
    });
  }
}
