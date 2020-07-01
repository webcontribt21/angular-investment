export class IbanValidateGetRequestAction {
  static type = '[Requests] Iban Validate Get';

  constructor(public payload?: string) {}
}

export class IbanValidateGetRequestSuccessAction {
  static type = '[Requests] Iban Validate Get Success';

  constructor(public payload: any) {}
}

export class IbanValidateGetRequestFailAction {
  static type = '[Requests] Iban Validate Get Fail';

  constructor(public payload: any) {}
}
