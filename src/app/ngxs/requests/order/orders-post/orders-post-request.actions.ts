export class OrdersPostRequestAction {
  static type = '[Requests] Orders Post';

  constructor(public payload?: any) {}
}

export class OrdersPostRequestSuccessAction {
  static type = '[Requests] Orders Post Success';

  constructor(public payload: any) {}
}

export class OrdersPostRequestFailAction {
  static type = '[Requests] Orders Post Fail';

  constructor(public payload: any) {}
}
