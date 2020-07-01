export class PasswordPostRequestAction {
  static type = '[Requests] Password Post';

  constructor(public payload?: any) {}
}

export class PasswordPostRequestSuccessAction {
  static type = '[Requests] Password Post Success';

  constructor(public payload: any) {}
}

export class PasswordPostRequestFailAction {
  static type = '[Requests] Password Post Fail';

  constructor(public payload: any) {}
}
