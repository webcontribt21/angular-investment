export class PerformanceProjectionsGetRequestAction {
  static type = '[Requests] Performance Projections Get';

  constructor(public payload?: any) {}
}

export class PerformanceProjectionsGetRequestSuccessAction {
  static type = '[Requests] Performance Projections Get Success';

  constructor(public payload: any) {}
}

export class PerformanceProjectionsGetRequestFailAction {
  static type = '[Requests] Performance Projections Get Fail';

  constructor(public payload: any) {}
}
