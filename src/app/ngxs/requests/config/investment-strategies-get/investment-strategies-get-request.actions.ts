export class InvestmentStrategiesGetRequestAction {
  static type = '[Requests] Investment Strategies Get';

  constructor(public payload?: any) {}
}

export class InvestmentStrategiesGetRequestSuccessAction {
  static type = '[Requests] Investment Strategies Get Success';

  constructor(public payload: any) {}
}

export class InvestmentStrategiesGetRequestFailAction {
  static type = '[Requests] Investment Strategies Get Fail';

  constructor(public payload: any) {}
}
