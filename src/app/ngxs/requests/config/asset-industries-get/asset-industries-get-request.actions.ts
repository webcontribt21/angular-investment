export class AssetIndustriesGetRequestAction {
  static type = '[Requests] Asset Industries Get';

  constructor(public payload?: any) {}
}

export class AssetIndustriesGetRequestSuccessAction {
  static type = '[Requests] Asset Industries Get Success';

  constructor(public payload: any) {}
}

export class AssetIndustriesGetRequestFailAction {
  static type = '[Requests] Asset Industries Get Fail';

  constructor(public payload: any) {}
}
