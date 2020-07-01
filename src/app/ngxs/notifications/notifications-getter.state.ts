import { Selector } from '@ngxs/store';

import { ActivityFeed } from '../../core/models';

import { NotificationsState, NotificationsStateModel } from './notifications.state';

export class NotificationsGetterState {
  @Selector([NotificationsState])
  static getNotificationsState(state: NotificationsStateModel): NotificationsStateModel {
    return state;
  }

  @Selector([NotificationsState])
  static getActivityFeed(state: NotificationsStateModel): ActivityFeed[] {
    return state.activityFeed;
  }

  @Selector([NotificationsState])
  static getActivityFeedPaginationOptions(state: NotificationsStateModel): { offset: number; totalCount: number; limit: number } {
    return state.activityFeedPagination;
  }
}
