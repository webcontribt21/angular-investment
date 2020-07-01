import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { LanguagesEnum } from '../../../core/enums/i18n.enum';
import { I18nService } from '../../../core/services';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
  ],
})
export class CurrencyInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() isInvalid: boolean;
  @Input() isDisabled: boolean;

  currencyInputOptions$: Observable<{ thousands: string }>;

  subscriptions: Subscription[] = [];
  currencyFormControl = new FormControl();
  onChange: (value: string) => void;
  onTouched: () => void;

  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    this.currencyInputOptions$ = this.i18nService.selectedLang$.pipe(
      filter(res => !!res),
      map((lang: LanguagesEnum) => (lang === LanguagesEnum.de ? { thousands: '.' } : { thousands: ',' })),
    );

    this.subscriptions.push(
      this.currencyFormControl.valueChanges.pipe(filter(() => !!this.onChange)).subscribe(value => this.onChange(value)),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  writeValue(value) {
    this.currencyFormControl.patchValue(value);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
