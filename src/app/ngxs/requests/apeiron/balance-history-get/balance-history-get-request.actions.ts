import { ApeironHistory } from '../../../../core/models';

export class BalanceHistoryGetRequestAction {
  static type = '[Request] Balance History Get';

  constructor(public payload?: any) {}
}

export class BalanceHistoryGetRequestSuccessAction {
  static type = '[Request] Balance History Get Success';

  constructor(public payload: ApeironHistory[]) {}
}

export class BalanceHistoryGetRequestFailAction {
  static type = '[Request] Balance History Get Fail';

  constructor(public payload: any) {}
}
