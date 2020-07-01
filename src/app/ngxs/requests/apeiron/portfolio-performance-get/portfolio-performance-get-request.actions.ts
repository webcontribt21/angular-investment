export class PortfolioPerformanceGetRequestActions {
  static type = '[Requests] Portfolio Performance Get Request';
}

export class PortfolioPerformanceGetRequestSuccessAction {
  static type = '[Requests] Portfolio Performance Get Request Success';

  constructor(public payload: any) {}
}

export class PortfolioPerformanceGetRequestFailAction {
  static type = '[Requests] Portfolio Performance Get Request Fail';

  constructor(public payload: any) {}
}
