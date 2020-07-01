import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { I18nService, UserService } from '../../../core/services';
import { User } from '../../../core/models';
import { LanguageOptions } from 'src/app/core/services/i18n.service';

@Component({
  selector: 'app-communication-preferences',
  templateUrl: './communication-preferences.component.html',
  styleUrls: ['./communication-preferences.component.scss'],
})
export class CommunicationPreferencesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isPhoneInputDisplayed = false;

  fakePhoneNumber: FormControl = new FormControl(null, {
    validators: [],
    updateOn: 'change',
  });

  communicationForm;

  languages$: Observable<LanguageOptions> = this.i18nService.languages$;

  get phoneNumberControl(): FormControl {
    return this.communicationForm.get('phoneNumber') as FormControl;
  }
  get preferredLanguageControl(): FormControl {
    return this.communicationForm.get('preferredLanguage') as FormControl;
  }

  constructor(private userService: UserService, private i18nService: I18nService) {}

  static phoneValidator(telObject: any) {
    return (fc: FormControl) => {
      if (!telObject.isValidNumber()) {
        return { isInvalid: true };
      }
      return null;
    };
  }

  ngOnInit() {
    this.communicationForm = new FormGroup({
      phoneNumber: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      preferredLanguage: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
    });

    this.subscriptions.push(
      this.userService.selfData$.pipe(filter(res => !!res)).subscribe((user: User) => {
        this.communicationForm.patchValue(user);
        this.fakePhoneNumber.patchValue(user.phoneNumber);
        this.isPhoneInputDisplayed = true;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  telInputObject(obj) {
    this.fakePhoneNumber.setValidators(CommunicationPreferencesComponent.phoneValidator(obj));
    this.fakePhoneNumber.updateValueAndValidity();
  }

  getNumber(phoneNumber) {
    this.phoneNumberControl.patchValue(phoneNumber);
  }

  hasError(noError: boolean) {
    this.phoneNumberControl.markAsDirty();
    this.phoneNumberControl.setErrors(noError ? null : { isInvalid: true });
  }

  submit() {
    if (this.communicationForm.invalid) {
      return;
    }
    const data = this.communicationForm.value;
    this.userService.saveUser(data);
  }
}
