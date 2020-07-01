import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { RouterNavigation } from '@ngxs/router-plugin';

import { ApplicationService, CustomerService, ****KeycloakService, IntercomService, UserService } from '../../../../core/services';
import { Customer, User } from '../../../../core/models';
import { SwitchAccountModalComponent } from '../../../../shared/modals/switch-account-modal/switch-account-modal.component';
import { LoadCustomerSuccessAction } from '../../../../ngxs/customer/customer.actions';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  isOpenUserMenu$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  selfData$: Observable<User> = this.userService.selfData$;
  selectedCustomer$: Observable<Customer> = this.customerService.selectedCustomer$;
  isSingleAccount$: Observable<boolean> = this.selfData$.pipe(
    filter(res => !!res),
    map((selfData: User) => selfData.managedCustomers.length === 1),
  );
  isSingleOwnerAccount$: Observable<boolean> = this.selfData$.pipe(
    filter(res => !!res),
    map((selfData: User) => selfData.managedCustomers.length === 1 && selfData.managedCustomers[0].relation === 'OWNER'),
  );
  isDesktop$: Observable<boolean> = this.applicationService.isDesktop$;
  relation$: Observable<string> = combineLatest(this.userService.managedCustomers$, this.selectedCustomer$.pipe(filter(res => !!res))).pipe(
    map(([customers, selectedCustomer]) => {
      const managedCustomer = customers.find(customer => customer.customerId === selectedCustomer.id);
      return managedCustomer.relation;
    }),
  );

  constructor(
    private ****KeycloakService: ****KeycloakService,
    private userService: UserService,
    private customerService: CustomerService,
    private applicationService: ApplicationService,
    private intercomService: IntercomService,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.actions$.pipe(ofActionSuccessful(RouterNavigation, LoadCustomerSuccessAction)).subscribe(() => {
        this.closeMenu();
        this.applicationService.closeModal();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  openUserMenu() {
    this.isOpenUserMenu$.next(true);
  }

  closeMenu() {
    this.isOpenUserMenu$.next(false);
  }

  showIntercom() {
    this.intercomService.showIntercom();
  }

  switchAccount() {
    this.applicationService.openModal(SwitchAccountModalComponent, {
      styleClass: 'switch-account-modal',
    });
  }

  logout() {
    this.****KeycloakService.logout();
  }
}
