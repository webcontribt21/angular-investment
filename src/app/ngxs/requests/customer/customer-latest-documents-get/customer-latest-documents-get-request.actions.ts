import { CustomerDocument } from '../../../../core/models';

export class CustomerLatestDocumentsGetRequestAction {
  static type = '[Requests] Customer Latest Documents Get';

  constructor(public payload: any) {}
}

export class CustomerLatestDocumentsGetRequestSuccessAction {
  static type = '[Requests] Customer Latest Documents Get Success';

  constructor(public payload: { items: CustomerDocument[]; totalCount: number }) {}
}

export class CustomerLatestDocumentsGetRequestFailAction {
  static type = '[Requests] Customer Latest Documents Get Fail';

  constructor(public payload: any) {}
}
