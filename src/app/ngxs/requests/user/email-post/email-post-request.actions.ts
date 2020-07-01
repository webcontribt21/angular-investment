export class EmailPostRequestAction {
  static type = '[Requests] Email Post';

  constructor(public payload?: any) {}
}

export class EmailPostRequestSuccessAction {
  static type = '[Requests] Email Post Success';

  constructor(public payload: any) {}
}

export class EmailPostRequestFailAction {
  static type = '[Requests] Email Post Fail';

  constructor(public payload: any) {}
}
