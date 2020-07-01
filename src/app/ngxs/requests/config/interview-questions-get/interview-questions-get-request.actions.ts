export class InterviewQuestionsGetRequestAction {
  static type = '[Requests] Interview Questions Get';

  constructor(public payload?: any) {}
}

export class InterviewQuestionsGetRequestSuccessAction {
  static type = '[Requests] Interview Questions Get Success';

  constructor(public payload: any) {}
}

export class InterviewQuestionsGetRequestFailAction {
  static type = '[Requests] Interview Questions Get Fail';

  constructor(public payload: any) {}
}
