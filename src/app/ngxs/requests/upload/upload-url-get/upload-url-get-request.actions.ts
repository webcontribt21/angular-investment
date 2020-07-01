export class UploadUrlGetRequestAction {
  static type = '[Requests] Upload Url Get';

  constructor(public payload?: any) {}
}

export class UploadUrlGetRequestSuccessAction {
  static type = '[Requests] Upload Url Get Success';

  constructor(public payload: any) {}
}

export class UploadUrlGetRequestFailAction {
  static type = '[Requests] Upload Url Get Fail';

  constructor(public payload: any) {}
}
