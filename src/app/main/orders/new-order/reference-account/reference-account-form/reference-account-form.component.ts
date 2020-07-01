import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';
import { filter, debounceTime, map, take } from 'rxjs/operators';

import { CustomerService, UploadService } from '../../../../../core/services';
import { IbanService } from '../../../../../core/services/iban.service';
import { ValidatedIban } from '../../../../../core/models';
import { isGerman, GMValidators } from '../../../../../shared/utils';

@Component({
  selector: 'app-reference-account-form',
  templateUrl: './reference-account-form.component.html',
  styleUrls: ['./reference-account-form.component.scss'],
})
export class ReferenceAccountFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  referenceAccountForm: FormGroup;

  iban$: Observable<ValidatedIban[]>;

  get firstNameControl(): FormControl {
    return this.referenceAccountForm.get('firstName') as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.referenceAccountForm.get('lastName') as FormControl;
  }

  get bankAccountGroup(): FormGroup {
    return this.referenceAccountForm.get('bankAccount') as FormGroup;
  }

  get ibanControl(): FormControl {
    return this.bankAccountGroup.get('iban') as FormControl;
  }

  get bicControl(): FormControl {
    return this.bankAccountGroup.get('bic') as FormControl;
  }

  get bankControl(): FormControl {
    return this.bankAccountGroup.get('bank') as FormControl;
  }

  constructor(private ibanService: IbanService, private uploadService: UploadService, private customerService: CustomerService) {
    this.iban$ = this.ibanService.iban$;
  }

  ngOnInit() {
    this.referenceAccountForm = new FormGroup({
      formType: new FormControl('REFERENCE_ACCOUNT_CHANGE'),
      custodianCustomerId: new FormControl(),
      customerNumber: new FormControl(),
      title: new FormControl(),
      firstName: new FormControl({ value: '', disabled: true }),
      lastName: new FormControl({ value: '', disabled: true }),
      signatureDate: new FormControl(new Date().toISOString().slice(0, 10)),
      birthDate: new FormControl(),
      address: new FormGroup({
        postalCode: new FormControl(),
        city: new FormControl(),
        streetAndNumber: new FormControl(),
      }),
      bankAccount: new FormGroup({
        iban: new FormControl('', {
          validators: [Validators.required],
          asyncValidators: [this.ibanValidator.bind(this)],
          updateOn: 'change',
        }),
        bic: new FormControl(
          {
            value: '',
            disabled: true,
          },
          {
            validators: [Validators.required, this.bicValidator],
            updateOn: 'change',
          },
        ),
        bank: new FormControl(
          {
            value: '',
            disabled: true,
          },
          {
            validators: [Validators.required, GMValidators.disallowedCharacters, GMValidators.german],
            updateOn: 'change',
          },
        ),
      }),
    });

    this.subscriptions.push(
      this.customerService.selectedCustomer$.pipe(filter(res => !!res)).subscribe(customer => {
        this.referenceAccountForm.patchValue({
          custodianCustomerId: customer.custodianCustomerId,
          customerNumber: customer.customerNumber,
          title: customer.title,
          birthDate: customer.dateOfBirth,
          firstName: customer.bankAccount.holderFirstName,
          lastName: customer.bankAccount.holderLastName,
          address: {
            postalCode: customer.address.postalCode,
            city: customer.address.city,
            streetAndNumber: `${customer.address.streetName} ${customer.address.buildingNumber}`.trim(),
          },
        });
      }),

      this.ibanControl.valueChanges
        .pipe(
          debounceTime(300),
          filter(value => value && value.length > 0),
        )
        .subscribe(value => {
          this.ibanService.validate(value);
        }),

      this.iban$
        .pipe(
          filter(res => !!res),
          map(ibans => {
            const normalizedIban = this.ibanService.normalize(this.ibanControl.value);
            const found = ibans.find(storedIban => storedIban.iban === normalizedIban);
            return found;
          }),
          filter(res => !!res),
        )
        .subscribe(validatedIban => {
          if (validatedIban.valid) {
            this.ibanControl.setValue(validatedIban.iban.toUpperCase(), { emitEvent: false });
            if (validatedIban.validBank && isGerman(validatedIban.bankData.name)) {
              this.bankControl.setValue(validatedIban.bankData.name);
              this.bankControl.disable();
            } else {
              this.enableBankName();
            }
            if (validatedIban.validBank && isGerman(validatedIban.bankData.bic)) {
              this.bicControl.setValue(validatedIban.bankData.bic);
              this.bicControl.disable();
            } else {
              this.enableBic();
            }
          } else {
            this.enableBic();
            this.enableBankName();
          }
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  onSubmit() {
    const data = {
      ...this.referenceAccountForm.getRawValue(),
    };
    this.uploadService.createPdfTemplate(data);
  }

  bicValidator(fc: FormControl): ValidationErrors | null {
    const BIC_VALIDATOR = /^[A-Z]{6}[0-9A-Z]{2}([0-9A-Z]{3})?$/;
    return BIC_VALIDATOR.test(fc.value) ? null : { bic: true };
  }

  ibanValidator({ value }: AbstractControl): Observable<{ [key: string]: boolean } | null> {
    return this.iban$.pipe(
      map(ibans => {
        const normalized = this.ibanService.normalize(value);
        const found = ibans.find(i => i.iban === normalized);
        return found;
      }),
      filter(res => !!res),
      map(found => {
        return found.valid;
      }),
      map(valid => (valid ? null : { iban: true })),
      take(1),
    );
  }

  private enableBankName() {
    if (this.bankControl.disabled) {
      this.bankControl.setValue('');
      this.bankControl.enable();
    }
  }

  private enableBic() {
    if (this.bicControl.disabled) {
      this.bicControl.setValue('');
      this.bicControl.enable();
    }
  }
}
