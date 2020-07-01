export class PdfTemplatesPostRequestAction {
  static type = '[Requests] Pdf Templates Post';

  constructor(public payload?: any) {}
}

export class PdfTemplatesPostRequestSuccessAction {
  static type = '[Requests] Pdf Templates Post Success';

  constructor(public payload: any) {}
}

export class PdfTemplatesPostRequestFailAction {
  static type = '[Requests] Pdf Templates Post Fail';

  constructor(public payload: any) {}
}
