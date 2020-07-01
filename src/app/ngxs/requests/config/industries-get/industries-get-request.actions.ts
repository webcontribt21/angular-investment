export class IndustriesGetRequestAction {
  static type = '[Requests] Industries Get';

  constructor(public payload?: any) {}
}

export class IndustriesGetRequestSuccessAction {
  static type = '[Requests] Industries Get Success';

  constructor(public payload: any) {}
}

export class IndustriesGetRequestFailAction {
  static type = '[Requests] Industries Get Fail';

  constructor(public payload: any) {}
}
