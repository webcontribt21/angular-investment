export class ViolationsGetRequestAction {
  static type = '[Requests] Violations Get';

  constructor(public payload?: any) {}
}

export class ViolationsGetRequestSuccessAction {
  static type = '[Requests] Violations Get Success';

  constructor(public payload: any) {}
}

export class ViolationsGetRequestFailAction {
  static type = '[Requests] Violations Get Fail';

  constructor(public payload: any) {}
}
