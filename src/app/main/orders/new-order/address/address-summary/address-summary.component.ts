import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, pluck, withLatestFrom } from 'rxjs/operators';

import { Country, Customer } from '../../../../../core/models';
import { ConfigService, CustomerService, OrderService } from '../../../../../core/services';

interface AddressForm {
  formType: string;
  custodianCustomerId: string;
  firstName: string;
  lastName: string;
  signatureDate: string;
  title: string;
  address: {
    city: string;
    countryName: string;
    postalCode: string;
    streetAndNumber: string;
  };
}

@Component({
  selector: 'app-address-summary',
  templateUrl: './address-summary.component.html',
  styleUrls: ['./address-summary.component.scss'],
})
export class AddressSummaryComponent implements OnInit {
  selectedCustomer$: Observable<Customer> = this.customerService.selectedCustomer$;
  oldCountry$: Observable<Country>;
  newCountry$: Observable<Country>;
  newAddress$: Observable<AddressForm>;

  constructor(private customerService: CustomerService, private orderService: OrderService, private configService: ConfigService) {}

  ngOnInit() {
    this.oldCountry$ = this.selectedCustomer$.pipe(
      withLatestFrom(this.configService.countries$),
      map(([customer, countries]) => {
        return countries.find(country => country.code === customer.address.country);
      }),
    );

    this.newAddress$ = this.orderService.newAddressFormValue$.pipe(pluck('model'));

    this.newCountry$ = this.newAddress$.pipe(
      withLatestFrom(this.configService.countries$),
      map(([addressForm, countries]) => {
        return countries.find(country => country.label.de === addressForm.address.countryName);
      }),
    );
  }
}
