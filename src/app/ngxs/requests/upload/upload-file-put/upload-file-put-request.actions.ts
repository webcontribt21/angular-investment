export class UploadFilePutRequestAction {
  static type = '[Requests] Upload File Put';

  constructor(public payload?: any) {}
}

export class UploadFilePutRequestSuccessAction {
  static type = '[Requests] Upload File Put Success';

  constructor(public payload: any) {}
}

export class UploadFilePutRequestFailAction {
  static type = '[Requests] Upload File Put Fail';

  constructor(public payload: any) {}
}
