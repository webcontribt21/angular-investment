import { ActivityFeed } from '../../core/models';

const ActionTypes = {
  LOAD_ACTIVITY_FEED: '[Notifications] Load ActivityFeed',
  LOAD_ACTIVITY_FEED_SUCCESS: '[Notifications] Load ActivityFeed Success',
  LOAD_ACTIVITY_FEED_FAIL: '[Notifications] Load ActivityFeed Fail',
};

export class LoadActivityFeedAction {
  static type = ActionTypes.LOAD_ACTIVITY_FEED;

  constructor(public payload: number) {}
}
export class LoadActivityFeedSuccessAction {
  static type = ActionTypes.LOAD_ACTIVITY_FEED_SUCCESS;

  constructor(public payload: { items: ActivityFeed[]; totalCount: number }) {}
}
export class LoadActivityFeedFailAction {
  static type = ActionTypes.LOAD_ACTIVITY_FEED_FAIL;

  constructor(public payload?: any) {}
}
