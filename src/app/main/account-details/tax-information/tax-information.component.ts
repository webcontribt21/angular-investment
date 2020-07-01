import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMapTo, take } from 'rxjs/operators';

import { CustomerService } from '../../../core/services';
import { Customer } from '../../../core/models';

@Component({
  selector: 'app-tax-information',
  templateUrl: './tax-information.component.html',
  styleUrls: ['./tax-information.component.scss'],
})
export class TaxInformationComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  selectedCustomer$: Observable<Customer> = this.customerService.selectedCustomer$;

  germanTaxId$: Observable<string>;
  isShownAddTaxIdForm = false;

  taxIdForm: FormGroup;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.germanTaxId$ = this.selectedCustomer$.pipe(
      filter(res => !!res),
      map(customer => {
        const tax = customer.taxIdentification.find(res => res.country === 'DE');
        return tax && tax.number;
      }),
    );

    this.taxIdForm = new FormGroup({
      tin: new FormControl(null, {
        validators: [Validators.required, Validators.min(10000000000), Validators.max(99999999999)],
        asyncValidators: [this.sameTaxIdValidation.bind(this)],
        updateOn: 'change',
      }),
    });

    this.subscriptions.push(
      this.customerService.customerPatchRequestState$
        .pipe(
          filter(res => res.loading),
          switchMapTo(this.customerService.customerPatchRequestState$.pipe(filter(res => res.loaded))),
        )
        .subscribe(() => {
          this.isShownAddTaxIdForm = false;
          this.taxIdForm.reset();
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  sameTaxIdValidation(control: AbstractControl) {
    return this.germanTaxId$.pipe(
      map(taxId => {
        return taxId === control.value ? { isSame: true } : null;
      }),
    );
  }

  addTaxId() {
    this.isShownAddTaxIdForm = true;
  }

  cancelTaxIdSetting() {
    this.isShownAddTaxIdForm = false;
    this.taxIdForm.reset();
  }

  onTaxIdSave() {
    this.germanTaxId$.pipe(take(1)).subscribe(taxId => {
      const op = taxId ? 'replace' : 'add';
      const data = [
        {
          op: `${op}`,
          path: '/taxIdentification/DE',
          value: `${this.taxIdForm.value.tin}`,
        },
      ];
      this.customerService.saveCustomer(data);
    });
  }
}
