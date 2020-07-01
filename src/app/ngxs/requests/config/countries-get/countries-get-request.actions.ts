export class CountriesGetRequestAction {
  static type = '[Requests] Countries Get';

  constructor(public payload?: any) {}
}

export class CountriesGetRequestSuccessAction {
  static type = '[Requests] Countries Get Success';

  constructor(public payload: any) {}
}

export class CountriesGetRequestFailAction {
  static type = '[Requests] Countries Get Fail';

  constructor(public payload: any) {}
}
