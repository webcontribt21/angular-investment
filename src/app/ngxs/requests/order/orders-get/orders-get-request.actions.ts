export class OrdersGetRequestAction {
  static type = '[Requests] Orders Get';

  constructor(public payload?: any) {}
}

export class OrdersGetRequestSuccessAction {
  static type = '[Requests] Orders Get Success';

  constructor(public payload: any) {}
}

export class OrdersGetRequestFailAction {
  static type = '[Requests] Orders Get Fail';

  constructor(public payload: any) {}
}
