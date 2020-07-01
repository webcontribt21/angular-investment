export class RiskProfilesGetRequestAction {
  static type = '[Requests] Risk Profiles Get';

  constructor(public payload?: any) {}
}

export class RiskProfilesGetRequestSuccessAction {
  static type = '[Requests] Risk Profiles Get Success';

  constructor(public payload: any) {}
}

export class RiskProfilesGetRequestFailAction {
  static type = '[Requests] Risk Profiles Get Fail';

  constructor(public payload: any) {}
}
