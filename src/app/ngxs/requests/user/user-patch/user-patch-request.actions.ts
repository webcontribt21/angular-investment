export class UserPatchRequestAction {
  static type = '[Requests] User Patch';

  constructor(public payload?: any) {}
}

export class UserPatchRequestSuccessAction {
  static type = '[Requests] User Patch Success';

  constructor(public payload: any) {}
}

export class UserPatchRequestFailAction {
  static type = '[Requests] User Patch Fail';

  constructor(public payload: any) {}
}
