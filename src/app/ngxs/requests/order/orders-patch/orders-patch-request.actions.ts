export class OrdersPatchRequestAction {
  static type = '[Requests] Orders Patch';

  constructor(public payload?: any) {}
}

export class OrdersPatchRequestSuccessAction {
  static type = '[Requests] Orders Patch Success';

  constructor(public payload: any) {}
}

export class OrdersPatchRequestFailAction {
  static type = '[Requests] Orders Patch Fail';

  constructor(public payload: any) {}
}
