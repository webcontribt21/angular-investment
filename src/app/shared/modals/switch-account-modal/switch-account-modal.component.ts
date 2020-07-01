import { Component, OnDestroy, OnInit } from '@angular/core';

import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { CustomerService, UserService } from '../../../core/services';

@Component({
  selector: 'app-switch-account-modal',
  templateUrl: './switch-account-modal.component.html',
  styleUrls: ['./switch-account-modal.component.scss'],
})
export class SwitchAccountModalComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  accounts$: Observable<any[]>;

  selectedCustomerId$: Observable<string> = this.customerService.selectedCustomer$.pipe(
    filter(res => !!res),
    map(res => res.id),
  );
  selectCustomerEvent$: Subject<string> = new Subject();

  constructor(private customerService: CustomerService, private userService: UserService, private ref: DynamicDialogRef) {}

  ngOnInit() {
    this.accounts$ = combineLatest(this.userService.managedCustomers$, this.selectedCustomerId$).pipe(
      map(([customers, selectedCustomerId]) => {
        return customers.map(customer => {
          return {
            ...customer,
            active: customer.customerId === selectedCustomerId,
          };
        });
      }),
    );

    this.subscriptions.push(
      this.selectCustomerEvent$
        .pipe(
          switchMap(customerToSelect => {
            return this.selectedCustomerId$.pipe(
              take(1),
              map(selectedCustomerId => {
                return selectedCustomerId !== customerToSelect && customerToSelect;
              }),
            );
          }),
          filter(res => !!res),
        )
        .subscribe(customerToSelect => {
          this.customerService.loadCustomer(customerToSelect);
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  selectCustomer(customerId: string) {
    this.selectCustomerEvent$.next(customerId);
  }

  onClose() {
    this.ref.close();
  }
}
