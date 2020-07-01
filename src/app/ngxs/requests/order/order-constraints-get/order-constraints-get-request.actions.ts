export class OrderConstraintsGetRequestAction {
  static type = '[Requests] Order Constraints Get';

  constructor(public payload?: any) {}
}

export class OrderConstraintsGetRequestSuccessAction {
  static type = '[Requests] Order Constraints Get Success';

  constructor(public payload: any) {}
}

export class OrderConstraintsGetRequestFailAction {
  static type = '[Requests] Order Constraints Get Fail';

  constructor(public payload: any) {}
}
