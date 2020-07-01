import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Customer } from '../../../../../core/models';
import { CustomerService, OrderService } from '../../../../../core/services';

interface ReferenceAccountForm {
  formType: string;
  custodianCustomerId: string;
  customerNumber: string;
  firstName: string;
  lastName: string;
  signatureDate: string;
  birthDate: string;
  title: string;
  address: {
    city: string;
    postalCode: string;
    streetAndNumber: string;
  };
  bankAccount: {
    iban: string;
    bic: string;
    bank: string;
  };
}

@Component({
  selector: 'app-reference-account-summary',
  templateUrl: './reference-account-summary.component.html',
  styleUrls: ['./reference-account-summary.component.scss'],
})
export class ReferenceAccountSummaryComponent implements OnInit {
  selectedCustomer$: Observable<Customer> = this.customerService.selectedCustomer$;
  referenceAccount$: Observable<ReferenceAccountForm>;

  constructor(private customerService: CustomerService, private orderService: OrderService) {}

  ngOnInit() {
    this.referenceAccount$ = this.orderService.referenceAccountFormValue$.pipe(pluck('model'));
  }
}
