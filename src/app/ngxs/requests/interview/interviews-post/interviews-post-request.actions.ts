export class InterviewsPostRequestAction {
  static type = '[Requests] Interviews Post';

  constructor(public payload?: any) {}
}

export class InterviewsPostRequestSuccessAction {
  static type = '[Requests] Interviews Post Success';

  constructor(public payload: any) {}
}

export class InterviewsPostRequestFailAction {
  static type = '[Requests] Interviews Post Fail';

  constructor(public payload: any) {}
}
