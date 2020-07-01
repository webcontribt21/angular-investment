export class CustomerPatchRequestAction {
  static type = '[Requests] Customer Patch';

  constructor(public payload?: any) {}
}

export class CustomerPatchRequestSuccessAction {
  static type = '[Requests] Customer Patch Success';

  constructor(public payload: any) {}
}

export class CustomerPatchRequestFailAction {
  static type = '[Requests] Customer Patch Fail';

  constructor(public payload: any) {}
}
