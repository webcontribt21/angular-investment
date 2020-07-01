import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ApeironService, CustomerService } from '../../../core/services';
import { Customer, Portfolio } from '../../../core/models';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-total-stats',
  templateUrl: './total-stats.component.html',
  styleUrls: ['./total-stats.component.scss'],
})
export class TotalStatsComponent implements OnInit {
  isPerformanceNegative$: Observable<boolean>;
  portfolio$: Observable<Portfolio>;
  selectedCustomer$: Observable<Customer>;

  portfolioPerformance = null;
  isItemExtended = false;
  currentDomain = environment.domain;

  unusedKeys = [new Date().getFullYear().toString(), 'overall'];

  constructor(private apeironService: ApeironService, private customerService: CustomerService) {}

  ngOnInit() {
    this.isPerformanceNegative$ = this.apeironService.portfolio$.pipe(
      filter(res => !!res),
      map((portfolio: Portfolio) => portfolio.totalReturn < 0),
    );

    this.portfolio$ = this.apeironService.portfolio$.pipe(filter(res => !!res));

    this.selectedCustomer$ = this.customerService.selectedCustomer$.pipe(filter(res => !!res));

    this.apeironService.portfolioPerformance$.subscribe(res => {
      if (res) {
        this.portfolioPerformance = res[0];
      }
    });
  }
}
