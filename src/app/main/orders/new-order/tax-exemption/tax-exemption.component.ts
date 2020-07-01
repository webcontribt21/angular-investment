import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Customer } from '../../../../core/models';
import { CustomerService, OrderService } from '../../../../core/services';

@Component({
  selector: 'app-tax-exemption',
  templateUrl: './tax-exemption.component.html',
  styleUrls: ['./tax-exemption.component.scss'],
})
export class TaxExemptionComponent implements OnInit, OnDestroy {
  selectedCustomer$: Observable<Customer>;
  isMakeOrder$: Observable<boolean>;

  constructor(private customerService: CustomerService, private orderService: OrderService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.selectedCustomer$ = this.customerService.selectedCustomer$;
    this.isMakeOrder$ = this.activatedRoute.params.pipe(map(res => res['make-order'] === 'true'));
  }

  ngOnDestroy() {
    this.orderService.clearTaxExemptionForm();
  }
}
