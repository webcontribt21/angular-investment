import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, combineLatest } from 'rxjs';
import { filter, take, withLatestFrom } from 'rxjs/operators';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Select, Store } from '@ngxs/store';

import { Customer, ActivityFeed, Pagination } from '../models';
import { CustomerService } from './customer.service';
import { I18nService } from './i18n.service';

import { LoadActivityFeedAction } from '../../ngxs/notifications/notifications.actions';
import { NotificationsGetterState } from '../../ngxs/notifications';
import { IRequestsNestedState } from '../../ngxs/requests/requests.interface';
import { LanguagesEnum } from '../enums/i18n.enum';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  @Select(NotificationsGetterState.getActivityFeed)
  activityFeed$: Observable<ActivityFeed[]>;
  activityFeedGetRequestState$: Observable<IRequestsNestedState>;

  @Select(NotificationsGetterState.getActivityFeedPaginationOptions)
  activityFeedPagination$: Observable<Pagination>;

  constructor(
    private store: Store,
    private httpClient: HttpClient,
    private customerService: CustomerService,
    private i18nService: I18nService,
  ) {
    this.activityFeedGetRequestState$ = this.store.select(state => state.requests.activityFeedGetRequestState);
  }

  loadActivityFeed(offset = 0): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadActivityFeedAction(offset));
    return this.activityFeedGetRequestState$;
  }

  loadActivityFeedRequest(offset: number) {
    return combineLatest(this.customerService.selectedCustomer$, this.i18nService.selectedLang$).pipe(
      filter(([res1, res2]) => !!res1 && !!res2),
      take(1),
      withLatestFrom(this.activityFeedPagination$),
      switchMap(([[customer, lang], paginationOptions]: [[Customer, LanguagesEnum], Pagination]) =>
        this.httpClient.get('notifications', {
          params: {
            customerId: customer.id,
            channel: 'ACTIVITY_FEED',
            language: lang,
            offset: offset.toString(),
            limit: paginationOptions.limit.toString(),
          },
        }),
      ),
    );
  }
}
