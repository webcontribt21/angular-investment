export class ActivityFeedGetRequestAction {
  static type = '[Requests] ActivityFeed Get';

  constructor(public payload: any) {}
}

export class ActivityFeedGetRequestSuccessAction {
  static type = '[Requests] ActivityFeed Get Success';

  constructor(public payload: any) {}
}

export class ActivityFeedGetRequestFailAction {
  static type = '[Requests] ActivityFeed Get Fail';

  constructor(public payload: any) {}
}
