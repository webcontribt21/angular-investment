export class InboxDocumentCategoriesGetRequestAction {
  static type = '[Requests] Inbox Document Categories Get';

  constructor(public payload?: any) {}
}

export class InboxDocumentCategoriesGetRequestSuccessAction {
  static type = '[Requests] Inbox Document Categories Get Success';

  constructor(public payload: any) {}
}

export class InboxDocumentCategoriesGetRequestFailAction {
  static type = '[Requests] Inbox Document Categories Get Fail';

  constructor(public payload: any) {}
}
