export class AssetLabelsGetRequestAction {
  static type = '[Requests] Asset Labels Get';

  constructor(public payload?: any) {}
}

export class AssetLabelsGetRequestSuccessAction {
  static type = '[Requests] Asset Labels Get Success';

  constructor(public payload: any) {}
}

export class AssetLabelsGetRequestFailAction {
  static type = '[Requests] Asset Labels Get Fail';

  constructor(public payload: any) {}
}
