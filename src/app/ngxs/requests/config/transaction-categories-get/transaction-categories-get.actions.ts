export class TransactionCategoriesGetRequestAction {
  static type = '[Requests] Transaction Categories Get';

  constructor(public payload?: any) {}
}

export class TransactionCategoriesGetRequestSuccessAction {
  static type = '[Requests] Transaction Categories Get Success';

  constructor(public payload: any) {}
}

export class TransactionCategoriesGetRequestFailAction {
  static type = '[Requests] Transaction Categories Get Fail';

  constructor(public payload: any) {}
}
