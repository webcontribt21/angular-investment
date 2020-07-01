import { IbanValidationResult } from '../../core/models/iban.model';

export const ActionTypes = {
  VALIDATE_IBAN: '[Iban] Validate Iban',
  VALIDATE_IBAN_SUCCESS: '[Iban] Validate Iban Success',
  VALIDATE_IBAN_FAIL: '[Iban] Validate Iban Fail',
};

export class ValidateIbanAction {
  static type = ActionTypes.VALIDATE_IBAN;

  constructor(public payload: string) {}
}
export class ValidateIbanSuccessAction {
  static type = ActionTypes.VALIDATE_IBAN_SUCCESS;

  constructor(public payload: IbanValidationResult) {}
}
export class ValidateIbanFailAction {
  static type = ActionTypes.VALIDATE_IBAN_FAIL;

  constructor(public payload: any) {}
}
