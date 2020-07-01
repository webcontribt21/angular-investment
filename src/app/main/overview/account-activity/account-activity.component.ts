import { Component, OnInit } from '@angular/core';

import { Observable, combineLatest } from 'rxjs';
import { skip, filter } from 'rxjs/operators';

import { SubscriberCleanup } from '../../../core/helper';
import { ActivityFeed, Pagination } from '../../../core/models';
import { NotificationsService, CustomerService, I18nService } from '../../../core/services';

@Component({
  selector: 'app-account-activity',
  templateUrl: './account-activity.component.html',
  styleUrls: ['./account-activity.component.scss'],
})
export class AccountActivityComponent extends SubscriberCleanup implements OnInit {
  activityFeed$: Observable<ActivityFeed[]>;
  activityFeedPagination$: Observable<Pagination>;

  constructor(
    private customerService: CustomerService,
    private notificationsService: NotificationsService,
    private i18nService: I18nService,
  ) {
    super();
    this.activityFeed$ = this.notificationsService.activityFeed$;
    this.activityFeedPagination$ = this.notificationsService.activityFeedPagination$;
  }

  ngOnInit() {
    this.notificationsService.loadActivityFeed();
    this.addSubscription(
      // load transactions and summary on customer switch
      combineLatest(this.customerService.selectedCustomer$, this.i18nService.selectedLang$)
        .pipe(
          filter(([res, res2]) => !!res && !!res2),
          skip(1),
        )
        .subscribe(() => {
          this.notificationsService.loadActivityFeed();
        }),
    );
  }

  onPageChanged(newOffset: number) {
    this.notificationsService.loadActivityFeed(newOffset);
  }
}
