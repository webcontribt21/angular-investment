export class AssetClassesGetRequestAction {
  static type = '[Requests] Asset Classes Get';

  constructor(public payload?: any) {}
}

export class AssetClassesGetRequestSuccessAction {
  static type = '[Requests] Asset Classes Get Success';

  constructor(public payload: any) {}
}

export class AssetClassesGetRequestFailAction {
  static type = '[Requests] Asset Classes Get Fail';

  constructor(public payload: any) {}
}
