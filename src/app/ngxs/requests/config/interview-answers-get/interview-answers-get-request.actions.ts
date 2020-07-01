export class InterviewAnswersGetRequestAction {
  static type = '[Requests] Interview Answers Get';

  constructor(public payload?: any) {}
}

export class InterviewAnswersGetRequestSuccessAction {
  static type = '[Requests] Interview Answers Get Success';

  constructor(public payload: any) {}
}

export class InterviewAnswersGetRequestFailAction {
  static type = '[Requests] Interview Answers Get Fail';

  constructor(public payload: any) {}
}
