export class CustomerGetRequestAction {
  static type = '[Requests] Customer Get';

  constructor(public payload?: any) {}
}

export class CustomerGetRequestSuccessAction {
  static type = '[Requests] Customer Get Success';

  constructor(public payload: any) {}
}

export class CustomerGetRequestFailAction {
  static type = '[Requests] Customer Get Fail';

  constructor(public payload: any) {}
}
