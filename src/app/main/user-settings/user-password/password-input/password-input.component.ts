import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() invalid: boolean;

  subscriptions: Subscription[] = [];
  inputType = 'password';

  passwordFormControl = new FormControl();
  onChange: (value: string) => void;
  onTouched: () => void;

  ngOnInit() {
    this.subscriptions.push(
      this.passwordFormControl.valueChanges.pipe(filter(() => !!this.onChange)).subscribe(value => this.onChange(value)),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  writeValue(value) {
    this.passwordFormControl.patchValue(value);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  togglePasswordDisplay() {
    if (this.passwordFormControl.value) {
      this.inputType = this.inputType === 'password' ? 'text' : 'password';
    }
  }
}
