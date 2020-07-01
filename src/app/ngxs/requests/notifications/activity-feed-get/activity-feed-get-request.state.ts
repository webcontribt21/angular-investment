import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { ActivityFeed } from '../../../../core/models';
import { NotificationsService } from '../../../../core/services';

import { LoadActivityFeedFailAction, LoadActivityFeedSuccessAction } from '../../../notifications/notifications.actions';

import { IRequestsNestedState } from '../../requests.interface';
import { requestFailState, requestInitialState, requestLoadingState, requestSuccessState } from '../../../utils';
import {
  ActivityFeedGetRequestAction,
  ActivityFeedGetRequestFailAction,
  ActivityFeedGetRequestSuccessAction,
} from './activity-feed-get-request.actions';
import { SelectCustomerAction } from '../../../customer/customer.actions';
import { Injectable } from '@angular/core';

export interface ActivityFeedGetRequestStateModel extends IRequestsNestedState {}

@State<ActivityFeedGetRequestStateModel>({
  name: 'activityFeedGetRequestState',
  defaults: requestInitialState,
})
@Injectable()
export class ActivityFeedGetRequestState {
  constructor(private notificationsService: NotificationsService) {}

  @Action(SelectCustomerAction)
  selectCustomer(ctx: StateContext<ActivityFeedGetRequestStateModel>, action: SelectCustomerAction) {
    ctx.patchState({
      loading: false,
      loaded: false,
      status: '',
      data: null,
    });
  }

  @Action(ActivityFeedGetRequestAction)
  activityFeedGetRequest(ctx: StateContext<ActivityFeedGetRequestStateModel>, action: ActivityFeedGetRequestAction) {
    ctx.patchState(requestLoadingState);
    return this.notificationsService.loadActivityFeedRequest(action.payload).pipe(
      switchMap((res: ActivityFeed) => {
        return ctx.dispatch(new ActivityFeedGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new ActivityFeedGetRequestFailAction(error));
      }),
    );
  }

  @Action(ActivityFeedGetRequestSuccessAction)
  activityFeedGetRequestSuccess(ctx: StateContext<ActivityFeedGetRequestStateModel>, action: ActivityFeedGetRequestSuccessAction) {
    ctx.patchState(requestSuccessState(action.payload));
    ctx.dispatch(new LoadActivityFeedSuccessAction(action.payload));
  }

  @Action(ActivityFeedGetRequestFailAction)
  activityFeedGetRequestFail(ctx: StateContext<ActivityFeedGetRequestStateModel>, action: ActivityFeedGetRequestFailAction) {
    ctx.patchState(requestFailState(action.payload));
    ctx.dispatch(new LoadActivityFeedFailAction(action.payload));
  }
}
