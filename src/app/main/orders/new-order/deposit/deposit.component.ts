import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { CustomerService, OrderService } from '../../../../core/services';
import { Customer } from '../../../../core/models';
import { OrderTypeEnum } from '../../../../core/enums/order-type.enum';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  selectedCustomer$: Observable<Customer>;

  minMaxValues: { min: number; max: number };
  depositOrderFormGroup: FormGroup;

  get amountFormControl() {
    return this.depositOrderFormGroup.get('amount') as FormControl;
  }

  constructor(private customerService: CustomerService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.selectedCustomer$ = this.customerService.selectedCustomer$.pipe(filter(res => !!res));

    this.minMaxValues = {
      min: 250,
      max: 1000000,
    };

    this.depositOrderFormGroup = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.min(this.minMaxValues.min), Validators.max(this.minMaxValues.max)]),
    });
  }

  onSubmit() {
    this.orderService.createOrder({
      amount: this.amountFormControl.value,
      orderType: OrderTypeEnum.deposit,
    });
  }
}
