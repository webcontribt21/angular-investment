import { Action, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';

import { ActivityFeed, Pagination } from '../../core/models';
import { ApplicationService } from '../../core/services/application.service';

import { LoadActivityFeedAction, LoadActivityFeedSuccessAction } from './notifications.actions';
import { ActivityFeedGetRequestAction } from '../requests/notifications/activity-feed-get/activity-feed-get-request.actions';
import { Injectable } from '@angular/core';

export interface NotificationsStateModel {
  activityFeed: ActivityFeed[];
  activityFeedPagination: Pagination;
}

@State<NotificationsStateModel>({
  name: 'notifications',
  defaults: {
    activityFeed: [],
    activityFeedPagination: new Pagination({
      offset: 0,
      totalCount: 0,
      limit: 0,
    }),
  },
})
@Injectable()
export class NotificationsState implements NgxsOnInit {
  constructor(private store: Store, private applicationService: ApplicationService) {}

  ngxsOnInit(ctx: StateContext<NotificationsStateModel>) {
    ctx.patchState({
      activityFeedPagination: {
        ...ctx.getState().activityFeedPagination,
        limit: this.applicationService.paginationLimit.activityFeed,
      },
    });
  }

  @Action(LoadActivityFeedAction)
  loadActivityFeed(ctx: StateContext<NotificationsStateModel>, action: LoadActivityFeedAction) {
    ctx.dispatch(new ActivityFeedGetRequestAction(action.payload));
    const state = ctx.getState();
    ctx.patchState({
      activityFeedPagination: {
        ...state.activityFeedPagination,
        offset: action.payload,
      },
    });
  }

  @Action(LoadActivityFeedSuccessAction)
  loadActivityFeedSuccess(ctx: StateContext<NotificationsStateModel>, action: LoadActivityFeedSuccessAction) {
    const state = ctx.getState();
    ctx.patchState({
      activityFeed: action.payload.items,
      activityFeedPagination: {
        ...state.activityFeedPagination,
        totalCount: action.payload.totalCount,
      },
    });
  }
}
