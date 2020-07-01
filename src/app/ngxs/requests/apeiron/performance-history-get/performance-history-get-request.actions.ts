import { ApeironHistory } from '../../../../core/models';

export class PerformanceHistoryGetRequestAction {
  static type = '[Request] Performance History Get';

  constructor(public payload?: any) {}
}

export class PerformanceHistoryGetRequestSuccessAction {
  static type = '[Request] Performance History Get Success';

  constructor(public payload: ApeironHistory[]) {}
}

export class PerformanceHistoryGetRequestFailAction {
  static type = '[Request] Performance History Get Fail';

  constructor(public payload: any) {}
}
