export class SecuritiesGetRequestAction {
  static type = '[Requests] Securities Get';

  constructor(public payload?: any) {}
}

export class SecuritiesGetRequestSuccessAction {
  static type = '[Requests] Securities Get Success';

  constructor(public payload: any) {}
}

export class SecuritiesGetRequestFailAction {
  static type = '[Requests] Securities Get Fail';

  constructor(public payload: any) {}
}
