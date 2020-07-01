import { Selector } from '@ngxs/store';

import { ActivityFeedGetRequestStateModel, ActivityFeedGetRequestState } from './activity-feed-get-request.state';

export class ActivityFeedGetRequestGetterState {
  @Selector([ActivityFeedGetRequestState])
  static getNotificationsGetActivityFeedState(state: ActivityFeedGetRequestStateModel): ActivityFeedGetRequestStateModel {
    return state;
  }
}
