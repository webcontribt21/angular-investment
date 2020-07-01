export class AssetRegionsGetRequestAction {
  static type = '[Requests] Asset Regions Get';

  constructor(public payload?: any) {}
}

export class AssetRegionsGetRequestSuccessAction {
  static type = '[Requests] Asset Regions Get Success';

  constructor(public payload: any) {}
}

export class AssetRegionsGetRequestFailAction {
  static type = '[Requests] Asset Regions Get Fail';

  constructor(public payload: any) {}
}
