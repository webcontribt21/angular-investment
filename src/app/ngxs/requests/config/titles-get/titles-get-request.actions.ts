export class TitlesGetRequestAction {
  static type = '[Requests] Titles Get';

  constructor(public payload?: any) {}
}

export class TitlesGetRequestSuccessAction {
  static type = '[Requests] Titles Get Success';

  constructor(public payload: any) {}
}

export class TitlesGetRequestFailAction {
  static type = '[Requests] Titles Get Fail';

  constructor(public payload: any) {}
}
