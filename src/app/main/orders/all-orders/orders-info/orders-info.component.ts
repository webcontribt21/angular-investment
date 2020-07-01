import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Customer, Portfolio, StrategyToDisplay } from '../../../../core/models';
import { ApeironService, CustomerService } from '../../../../core/services';

@Component({
  selector: 'app-orders-info',
  templateUrl: './orders-info.component.html',
  styleUrls: ['./orders-info.component.scss'],
})
export class OrdersInfoComponent implements OnInit {
  portfolio$: Observable<Portfolio>;
  selectedCustomer$: Observable<Customer>;
  strategyToDisplay$: Observable<StrategyToDisplay>;

  constructor(private apeironService: ApeironService, private customerService: CustomerService) {}

  ngOnInit() {
    this.portfolio$ = this.apeironService.portfolio$.pipe(filter(res => !!res));
    this.selectedCustomer$ = this.customerService.selectedCustomer$.pipe(filter(res => !!res));
    this.strategyToDisplay$ = this.customerService.strategyToDisplay$;
  }
}
