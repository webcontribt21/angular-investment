import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { filter, skip } from 'rxjs/operators';

import { ApplicationService, CustomerService } from '../../../core/services';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  isMobile$: Observable<boolean>;

  constructor(private appService: ApplicationService, private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.isMobile$ = this.appService.isMobile$;

    this.subscriptions.push(
      // load transactions and summary on customer switch
      this.customerService.selectedCustomer$
        .pipe(
          filter(res => !!res),
          skip(1),
        )
        .subscribe(() => {
          this.router.navigate(['/', 'orders']);
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }
}
