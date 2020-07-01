import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, pluck, take } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import * as moment from 'moment';

import { ConfigService, CustomerService, I18nService, OrderService, UploadService } from '../../../../../core/services';
import { TaxExemptionAmountTypeEnum } from '../../../../../core/enums/tax-exemption-amount-type';

@Component({
  selector: 'app-tax-exemption-form',
  templateUrl: './tax-exemption-form.component.html',
  styleUrls: ['./tax-exemption-form.component.scss'],
})
export class TaxExemptionFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  dateControlsSubscription: Subscription;

  taxExemptionForm: FormGroup;
  joint = false;
  taxExemptionAmountTypeEnum = TaxExemptionAmountTypeEnum;

  amountPerPerson = 801;
  minAmount = 0;
  updateAmountEvent$: BehaviorSubject<number> = new BehaviorSubject(0);

  titleOptions$: Observable<SelectItem[]>;
  startDateOptions: SelectItem[];
  endDateOptions$: Observable<SelectItem[]>;

  get maxAmount(): number {
    return (this.joint ? 2 : 1) * this.amountPerPerson;
  }

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private configService: ConfigService,
    private i18nService: I18nService,
    private uploadService: UploadService,
  ) {}

  ngOnInit() {
    this.titleOptions$ = combineLatest(this.configService.titles$, this.i18nService.selectedLang$).pipe(
      map(([titles, lang]) => {
        return titles.map(title => {
          return {
            label: title.label[lang],
            value: title.code,
          };
        });
      }),
    );

    const currentYear: number = new Date().getFullYear();
    this.startDateOptions = new Array(5).fill(currentYear).map((val, index) => {
      const date = `${val + index}-01-01`;
      return {
        label: date,
        value: date,
      };
    });
    this.endDateOptions$ = this.i18nService.getTranslationByKeys(['TAX_EXEMPTION_PAGE.UNTIL_NEW_ORDER']).pipe(
      map(([untilNewOrder]) => {
        const endDateOptions = new Array(5).fill(currentYear).map((val, index) => {
          const date = `${val + index}-12-31`;
          return {
            label: date,
            value: date,
          };
        });
        endDateOptions.push({
          label: untilNewOrder.label,
          value: null,
        });

        return endDateOptions;
      }),
    );

    this.taxExemptionForm = new FormGroup(
      {
        formType: new FormControl('TAX_EXEMPTION'),
        signatureDate: new FormControl(new Date().toISOString().slice(0, 10)),
        custodianCustomerId: new FormControl('', Validators.required),
        title: new FormControl('', Validators.required),
        birthDate: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        germanTin: new FormControl('', {
          validators: [Validators.required],
        }),
        amountType: new FormControl('', {
          validators: [Validators.required],
        }),
        amount: new FormControl(null, {
          validators: [Validators.required, Validators.min(this.minAmount), Validators.max(this.maxAmount)],
          updateOn: 'change',
        }),
        startDate: new FormControl(this.startDateOptions[0].value, {
          validators: [Validators.required],
          updateOn: 'change',
        }),
        endDate: new FormControl('', {
          updateOn: 'change',
        }),
        address: new FormGroup({
          city: new FormControl(''),
          postalCode: new FormControl(''),
          streetAndNumber: new FormControl(''),
        }),
      },
      this.endDateValidation.bind(this),
    );

    this.subscriptions.push(
      // set initial form values
      this.customerService.selectedCustomer$.pipe(filter(res => !!res)).subscribe(customer => {
        this.taxExemptionForm.patchValue({
          germanTin: customer.germanTin,
          title: customer.title,
          birthDate: customer.dateOfBirth,
          custodianCustomerId: customer.custodianCustomerId,
          firstName: customer.firstName,
          lastName: customer.lastName,
          address: {
            city: customer.address.city,
            postalCode: customer.address.postalCode,
            streetAndNumber: `${customer.address.streetName} ${customer.address.buildingNumber}`,
          },
        });
      }),

      // fill the form with values from store if user returns to the first step
      this.orderService.taxExemptionFormValue$
        .pipe(
          pluck('model'),
          filter(taxForm => !!taxForm),
          take(1),
        )
        .subscribe(taxForm => {
          if (taxForm.spouse) {
            this.createJointTax();
          }
          this.taxExemptionForm.patchValue(taxForm);
        }),

      // set initial end date
      this.endDateOptions$.subscribe(options => {
        this.endDateControl.patchValue(options[options.length - 1].value);
      }),

      // update amount validation on spouse add/remove
      this.updateAmountEvent$.subscribe(() => {
        this.updateAmountMaxValidator();
        this.amountControl.updateValueAndValidity();
      }),

      // update amount value on amount type change
      combineLatest(this.updateAmountEvent$, this.amountTypeControl.valueChanges)
        .pipe(map(([event, amountType]) => amountType))
        .subscribe(amountType => {
          let amount: number;
          switch (amountType) {
            case this.taxExemptionAmountTypeEnum.useFull:
              amount = this.maxAmount;
              this.amountControl.enable();
              break;
            case this.taxExemptionAmountTypeEnum.lossSettlement:
              amount = 0;
              this.amountControl.disable();
              break;
            case this.taxExemptionAmountTypeEnum.useAmount:
              this.amountControl.enable();
              break;
          }

          if (amount !== undefined) {
            this.amountControl.patchValue(amount);
          }
          this.amountControl.updateValueAndValidity();
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  get amountTypeControl(): FormControl {
    return this.getControl('amountType');
  }

  get amountControl(): FormControl {
    return this.getControl('amount');
  }

  get startDateControl(): FormControl {
    return this.getControl('startDate');
  }

  get endDateControl(): FormControl {
    return this.getControl('endDate');
  }

  get titleControl(): FormControl {
    return this.getSpouseControl('title');
  }

  get firstNameControl(): FormControl {
    return this.getSpouseControl('firstName');
  }

  get lastNameControl(): FormControl {
    return this.getSpouseControl('lastName');
  }

  get dayControl(): FormControl {
    return this.getSpouseControl('day');
  }

  get monthControl(): FormControl {
    return this.getSpouseControl('month');
  }

  get yearControl(): FormControl {
    return this.getSpouseControl('year');
  }

  get spouseGermanTinControl(): FormControl {
    return this.getSpouseControl('germanTin');
  }

  get birthDateControl(): FormControl {
    return this.getSpouseControl('birthDate');
  }

  getControl(key): FormControl {
    return this.taxExemptionForm.get(key) as FormControl;
  }

  getSpouseControl(key): FormControl {
    return this.taxExemptionForm.get('spouse').get(key) as FormControl;
  }

  updateAmountMaxValidator() {
    this.amountControl.setValidators([Validators.required, Validators.min(this.minAmount), Validators.max(this.maxAmount)]);
  }

  onAmountSelect() {
    this.amountTypeControl.patchValue(this.taxExemptionAmountTypeEnum.useAmount);
  }

  endDateValidation(control: AbstractControl) {
    const startDateControl = control.get('startDate');
    const endDateControl = control.get('endDate');

    if (!endDateControl.value) {
      return null;
    }

    const res = new Date(startDateControl.value) > new Date(endDateControl.value) ? { isWrong: true } : null;
    endDateControl.setErrors(res);

    if (startDateControl.dirty && !endDateControl.dirty) {
      endDateControl.markAsDirty();
    }
  }

  createJointTax() {
    this.updateAmountMaxValidator();
    this.taxExemptionForm.addControl(
      'spouse',
      new FormGroup(
        {
          title: new FormControl('', {
            validators: [Validators.required],
            updateOn: 'change',
          }),
          firstName: new FormControl('', {
            validators: [Validators.required],
            updateOn: 'change',
          }),
          lastName: new FormControl('', {
            validators: [Validators.required],
            updateOn: 'change',
          }),
          day: new FormControl('', {
            validators: [Validators.required, this.dayValidator.bind(this)],
            updateOn: 'change',
          }),
          month: new FormControl('', {
            validators: [Validators.required, this.monthValidator.bind(this)],
            updateOn: 'change',
          }),
          year: new FormControl('', {
            validators: [Validators.required, this.yearValidator.bind(this)],
            updateOn: 'change',
          }),
          birthDate: new FormControl(''),
          germanTin: new FormControl('', {
            validators: [Validators.required, Validators.min(10000000000), Validators.max(99999999999)],
            updateOn: 'change',
          }),
        },
        {
          validators: [this.dateOfBirthValidator.bind(this)],
        },
      ),
    );
    this.joint = true;
    this.updateAmountEvent$.next(0);

    this.dateControlsSubscription = combineLatest(
      this.dayControl.valueChanges,
      this.monthControl.valueChanges,
      this.yearControl.valueChanges,
    )
      .pipe(filter(() => this.dayControl.valid && this.monthControl.valid && this.yearControl.valid))
      .subscribe(([day, month, year]: number[]) => {
        const date = `${year}-${month}-${day}`;
        this.birthDateControl.patchValue(date);
      });
  }

  cancelJointTax() {
    this.dateControlsSubscription.unsubscribe();
    this.updateAmountMaxValidator();
    this.taxExemptionForm.removeControl('spouse');
    const presetAmountControl = this.amountTypeControl;
    if (presetAmountControl.value === this.taxExemptionAmountTypeEnum.lossSettlement) {
      this.amountTypeControl.patchValue(this.taxExemptionAmountTypeEnum.useFull);
    }
    this.joint = false;
    this.updateAmountEvent$.next(0);
  }

  dateOfBirthValidator(formGroup: FormGroup) {
    const { day, month, year } = formGroup.value;
    if (!day || !month || !year) {
      return null;
    }

    const dateString = `${year}-${month}-${day}`;
    const date = new Date(dateString);
    const formatted = moment(dateString).format('YYYY-MM-DD');
    const isDateValid = moment(date, 'YYYY-MM-DD', true).isValid();
    const age = moment().diff(date, 'years');
    if (!isDateValid || dateString !== formatted || age < 18) {
      this.birthDateControl.setErrors({ invalidDateOfBirth: true });
    }
    return null;
  }

  dayValidator(fc: FormControl) {
    const day = fc.value ? fc.value.trim() : '';
    const parsed = parseInt(day, 10);
    if (day && (day.length > 2 || day.length === 0 || !this.isInteger(parsed) || parsed < 1 || parsed > 31)) {
      return { invalidDay: true };
    }
    return null;
  }

  monthValidator(fc: FormControl) {
    const month = fc.value ? fc.value.trim() : '';
    const parsed = parseInt(month, 10);
    if (month && (month.length > 2 || month.length === 0 || !this.isInteger(parsed) || parsed < 1 || parsed > 12)) {
      return { invalidMonth: true };
    }
    return null;
  }

  yearValidator(fc: FormControl) {
    const year = fc.value ? fc.value.trim() : '';
    const parsed = parseInt(year, 10);
    if (year && (year.length !== 4 || !this.isInteger(parsed) || parsed < 1900)) {
      return { invalidYear: true };
    }
    return null;
  }

  isInteger(value: number): boolean {
    return value === Math.round(value);
  }

  submit() {
    const spouseObj = this.taxExemptionForm.value.spouse || {};
    const { day, month, year, ...spouse } = spouseObj;
    let amount: number = null;
    if (this.amountTypeControl.value === TaxExemptionAmountTypeEnum.useAmount) {
      amount = this.amountControl.value;
    }
    const data = {
      ...this.taxExemptionForm.value,
      amount,
      ...(this.taxExemptionForm.value.spouse ? { spouse } : {}),
    };
    this.uploadService.createPdfTemplate(data);
  }
}
