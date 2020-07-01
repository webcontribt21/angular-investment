import { CustomerDocument } from '../../../../core/models';

export class CustomerDocumentsGetRequestAction {
  static type = '[Requests] Customer Documents Get';

  constructor(public payload: any) {}
}

export class CustomerDocumentsGetRequestSuccessAction {
  static type = '[Requests] Customer Documents Get Success';

  constructor(public payload: { items: CustomerDocument[]; totalCount: number }) {}
}

export class CustomerDocumentsGetRequestFailAction {
  static type = '[Requests] Customer Documents Get Fail';

  constructor(public payload: any) {}
}
