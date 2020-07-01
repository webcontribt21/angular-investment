import { Component, Input, OnInit } from '@angular/core';

import { Observable, combineLatest, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Country, Customer, Order, StrategyToDisplay } from '../../../../../core/models';
import { OrderStatusEnum } from '../../../../../core/enums/order-status.enum';
import { OrderTypeEnum } from '../../../../../core/enums/order-type.enum';
import { ConfigService, CustomerService, I18nService, OrderService } from '../../../../../core/services';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() order: Order;

  selectedCustomer$: Observable<Customer>;
  countries$: Observable<Country[]>;
  orderCountry$: Observable<string>;
  orderStrategyToDisplay$: Observable<StrategyToDisplay>;

  orderStatusEnum = OrderStatusEnum;
  orderTypeEnum = OrderTypeEnum;
  isItemExtended = false;

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private configService: ConfigService,
    private i18nService: I18nService,
  ) {}

  ngOnInit() {
    this.selectedCustomer$ = this.customerService.selectedCustomer$;
    this.countries$ = this.configService.countries$;

    this.orderCountry$ = combineLatest(
      this.i18nService.selectedLang$.pipe(filter(res => !!res)),
      this.countries$.pipe(filter(res => !!res)),
    ).pipe(
      map(([lang, countries]: [string, Country[]]) => {
        const orderCountry = countries.find(country => country.code === this.order.country);
        return orderCountry.label[lang];
      }),
    );

    this.orderStrategyToDisplay$ = of(this.order.strategy).pipe(
      this.configService.getStrategyByCode(),
      this.configService.strategyToDisplay(),
    );
  }

  cancelOrder(id: string) {
    this.orderService.patchOrder(id);
  }

  toggleMoreInfo() {
    this.isItemExtended = !this.isItemExtended;
  }
}
