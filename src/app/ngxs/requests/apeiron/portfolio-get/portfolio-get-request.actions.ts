import { Portfolio } from '../../../../core/models';

export class PortfolioGetRequestAction {
  static type = '[Requests] Portfolio Get';
}

export class PortfolioGetRequestSuccessAction {
  static type = '[Requests] Portfolio Get Success';

  constructor(public payload: Portfolio) {}
}

export class PortfolioGetRequestFailAction {
  static type = '[Requests] Portfolio Get Fail';

  constructor(public payload: any) {}
}
