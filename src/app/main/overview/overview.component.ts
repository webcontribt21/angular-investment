import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { filter, map, skip, switchMap, switchMapTo, take } from 'rxjs/operators';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';

import { ApeironService, ApplicationService, CustomerService, I18nService, UserService } from '../../core/services';
import { User } from '../../core/models';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  greeting$: Observable<string>;

  constructor(
    private apeironService: ApeironService,
    private customerService: CustomerService,
    private i18nService: I18nService,
    private userService: UserService,
    private applicationService: ApplicationService,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.greeting$ = combineLatest(
      this.userService.selfData$,
      this.i18nService.selectedLang$.pipe(
        switchMapTo(
          this.applicationService.greeting$.pipe(
            filter(x => !!x),
            take(1),
            switchMap(greetingKey => {
              return this.i18nService.getTranslationByKeys([greetingKey]).pipe(take(1));
            }),
          ),
        ),
      ),
    ).pipe(
      map(([user, [greeting]]: [User, SelectItem[]]) => {
        let endSign = '.';
        if (['OVERVIEW_PAGE.GREETING.HAPPY_NEW_YEAR', 'OVERVIEW_PAGE.GREETING.TODAY_IS_WORLD_SAVINGS_DAY'].includes(greeting.value)) {
          endSign = '!';
        }
        return `${greeting.label}, ${user.firstName}${endSign}`;
      }),
    );

    this.subscriptions.push(
      // load data on customer switch
      this.customerService.selectedCustomer$
        .pipe(
          filter(res => !!res),
          // skip first emit as initial data is loaded via resolver
          skip(1),
        )
        .subscribe(() => {
          this.apeironService.loadBalanceHistory();
          this.apeironService.loadPerformanceHistory();
          this.apeironService.loadPortfolio();
        }),

      this.i18nService.getTranslationByKeys(['PAGES_TITLES.MAIN']).subscribe((item: SelectItem[]) => {
        const [title] = item;
        this.titleService.setTitle(title.label);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }
}
