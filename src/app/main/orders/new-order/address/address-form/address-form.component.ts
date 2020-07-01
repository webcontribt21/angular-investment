import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';

import { ConfigService, CustomerService, I18nService, UploadService } from '../../../../../core/services';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  countryOptions$: Observable<SelectItem[]>;

  addressForm: FormGroup;

  get addressGroup(): FormGroup {
    return this.addressForm.get('address') as FormGroup;
  }

  get streetNameControl(): FormControl {
    return this.addressGroup.get('streetName') as FormControl;
  }

  get cityControl(): FormControl {
    return this.addressGroup.get('city') as FormControl;
  }

  get countryControl(): FormControl {
    return this.addressGroup.get('countryName') as FormControl;
  }

  get postalCodeControl(): FormControl {
    return this.addressGroup.get('postalCode') as FormControl;
  }

  get buildingNumberControl(): FormControl {
    return this.addressGroup.get('buildingNumber') as FormControl;
  }

  constructor(
    private uploadService: UploadService,
    private customerService: CustomerService,
    private configService: ConfigService,
    private i18nService: I18nService,
  ) {}

  ngOnInit() {
    this.addressForm = new FormGroup({
      formType: new FormControl('ADDRESS_CHANGE'),
      custodianCustomerId: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      signatureDate: new FormControl(new Date().toISOString().slice(0, 10)),
      title: new FormControl(),
      address: new FormGroup({
        streetName: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'change',
        }),
        city: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'change',
        }),
        countryName: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'change',
        }),
        postalCode: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'change',
        }),
        buildingNumber: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'change',
        }),
        streetAndNumber: new FormControl(''),
      }),
    });

    this.countryOptions$ = this.i18nService.selectedLang$.pipe(withLatestFrom(this.configService.countries$)).pipe(
      map(([lang, countries]) => {
        return countries
          .filter(country => country.taxResidenceUsageAllowed)
          .map(country => {
            return {
              label: country.label[lang],
              value: country.label.de,
            };
          })
          .sort((c1, c2) => c1.label.localeCompare(c2.label, lang));
      }),
    );

    this.subscriptions.push(
      this.customerService.selectedCustomer$
        .pipe(
          filter(res => !!res),
          withLatestFrom(this.configService.countries$),
        )
        .subscribe(([customer, countries]) => {
          this.addressForm.patchValue({
            custodianCustomerId: customer.custodianCustomerId,
            firstName: customer.firstName,
            lastName: customer.lastName,
            title: customer.title,
            address: {
              countryName: countries.find(country => country.code === customer.address.country).label.de,
            },
          });
        }),

      combineLatest(this.streetNameControl.valueChanges, this.buildingNumberControl.valueChanges).subscribe(([street, strNo]) => {
        const streetAndNumber = `${street} ${strNo}`.trim();
        this.addressGroup.patchValue({ streetAndNumber });
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  onSubmit() {
    const { streetName, buildingNumber, ...address } = this.addressForm.value.address;
    const data = {
      ...this.addressForm.value,
      address,
    };
    this.uploadService.createPdfTemplate(data);
  }
}
