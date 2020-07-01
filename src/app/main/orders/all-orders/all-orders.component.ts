import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { filter, map, skip, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

import { Order } from '../../../core/models';
import { ApeironService, ApplicationService, CustomerService, I18nService, OrderService } from '../../../core/services';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
})
export class AllOrdersComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  orders$: Observable<Order[]>;
  translatedMenuItems$: Observable<MenuItem[]>;
  isMobile$: Observable<boolean>;
  isTabletsHorizontal$: Observable<boolean>;
  isDesktop$: Observable<boolean>;

  menuItems: { value: string; link: string }[] = [
    {
      value: 'ORDERS_PAGE.MENU.ONE_TIME_DEPOSIT',
      link: '/orders/new/deposit',
    },
    {
      value: 'ORDERS_PAGE.MENU.WITHDRAWAL',
      link: '/orders/new/withdrawal',
    },
    {
      value: 'ORDERS_PAGE.MENU.CHANGE_MONTHLY_DEPOSIT',
      link: '/orders/new/monthly',
    },
    {
      value: 'ORDERS_PAGE.MENU.CHANGE_INVESTMENT_STRATEGY',
      link: '/orders/new/update-strategy/interview',
    },
    {
      value: 'ORDERS_PAGE.MENU.CREATE_TAX_EXEMPTION',
      link: '/orders/new/tax-exemption',
    },
    {
      value: 'ORDERS_PAGE.MENU.CHANGE_ADDRESS',
      link: '/orders/new/address',
    },
    {
      value: 'ORDERS_PAGE.MENU.CHANGE_REFERENCE_ACCOUNT',
      link: '/orders/new/reference-account',
    },
  ];

  constructor(
    private orderService: OrderService,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private appService: ApplicationService,
    private customerService: CustomerService,
    private apeironService: ApeironService,
  ) {}

  ngOnInit() {
    this.orders$ = this.orderService.orders$;
    this.isMobile$ = this.appService.isMobile$;
    this.isTabletsHorizontal$ = this.appService.isTabletsHorizontal$;
    this.isDesktop$ = this.appService.isDesktop$;
    this.translatedMenuItems$ = this.i18nService.selectedLang$.pipe(
      switchMap(() => {
        const values: string[] = this.menuItems.map(item => item.value);
        return this.i18nService.getTranslationByKeys(values);
      }),
      map(translatedItems => {
        return translatedItems.map(translatedItem => {
          const selectedItem: { value: string; link: string } = this.menuItems.find(item => item.value === translatedItem.value);
          return {
            label: translatedItem.label,
            routerLink: selectedItem.link,
          };
        });
      }),
    );

    this.subscriptions.push(
      // load transactions and summary on customer switch
      this.customerService.selectedCustomer$
        .pipe(
          filter(res => !!res),
          skip(1),
        )
        .subscribe(() => {
          this.orderService.loadOrders();
          this.apeironService.loadPortfolio();
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }
}
