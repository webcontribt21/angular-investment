export class UserGetRequestAction {
  static type = '[Requests] User Get';

  constructor(public payload?: any) {}
}

export class UserGetRequestSuccessAction {
  static type = '[Requests] User Get Success';

  constructor(public payload: any) {}
}

export class UserGetRequestFailAction {
  static type = '[Requests] User Get Fail';

  constructor(public payload: any) {}
}
