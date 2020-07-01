import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { Customer, Portfolio } from '../../../../core/models';
import { ApeironService, CustomerService, OrderService } from '../../../../core/services';
import { OrderTypeEnum } from '../../../../core/enums/order-type.enum';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss'],
})
export class MonthlyComponent implements OnInit {
  selectedCustomer$: Observable<Customer>;
  portfolio$: Observable<Portfolio>;

  minMaxValues: { min: number; max: number };
  monthlyOrderFormGroup: FormGroup;

  get amountFormControl() {
    return this.monthlyOrderFormGroup.get('amount') as FormControl;
  }

  constructor(private customerService: CustomerService, private orderService: OrderService, private apeironService: ApeironService) {}

  ngOnInit() {
    this.selectedCustomer$ = this.customerService.selectedCustomer$.pipe(filter(res => !!res));
    this.portfolio$ = this.apeironService.portfolio$.pipe(
      filter(res => !!res),
      take(1),
    );

    this.minMaxValues = {
      min: 50,
      max: 100000,
    };

    this.monthlyOrderFormGroup = new FormGroup({
      amount: new FormControl(null, {
        validators: [Validators.required, Validators.max(this.minMaxValues.max)],
        asyncValidators: [this.minAmountValidator.bind(this), this.oldAmountValidator.bind(this)],
      }),
    });
  }

  minAmountValidator({ value }: AbstractControl): Observable<{ [key: string]: boolean } | null> {
    return this.portfolio$.pipe(
      map(({ currentBalance }: Portfolio) => {
        if (value >= 50) {
          return null;
        } else {
          return currentBalance >= 5000 && value === 0 ? null : { minAmountError: true };
        }
      }),
    );
  }

  oldAmountValidator({ value }: AbstractControl): Observable<{ [key: string]: boolean } | null> {
    return this.portfolio$.pipe(
      map(({ recurringDeposit }: Portfolio) => {
        return recurringDeposit.amount !== value ? null : { oldAmountError: true };
      }),
    );
  }

  onSubmit() {
    this.orderService.createOrder({
      amount: this.amountFormControl.value,
      scheduleType: 'MONTHLY',
      orderType: OrderTypeEnum.recurringDepositChange,
    });
  }
}
