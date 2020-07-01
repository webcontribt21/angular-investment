import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { UserService } from '../../../core/services';
import { IRequestsNestedState } from '../../../ngxs/requests/requests.interface';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss'],
})
export class UserPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  digitPattern = /\d/;
  lowercaseLetterPattern = /[a-z]/;
  passwordPostRequestState$: Observable<IRequestsNestedState> = this.userService.passwordPostRequestState$;

  get oldPasswordControl(): FormControl {
    return this.passwordForm.get('oldPassword') as FormControl;
  }
  get newPasswordControl(): FormControl {
    return this.passwordForm.get('newPassword') as FormControl;
  }

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', {
        validators: [Validators.required],
      }),
      newPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          this.digitValidation.bind(this),
          this.lowercaseLetterValidation.bind(this),
        ],
        asyncValidators: [this.notEmailValidation.bind(this)],
        updateOn: 'change',
      }),
    });

    this.passwordPostRequestState$
      .pipe(
        filter(res => res && res.loaded && res.data && res.status === 'fail'),
        map((res: any) => {
          const violations: any[] = res.data.violations;
          return violations.find(violation => violation.reason === 'V006: Wrong old password');
        }),
        filter(res => !!res),
      )
      .subscribe(() => {
        this.oldPasswordControl.setErrors({ isWrong: true });
      });
  }

  digitValidation(control: AbstractControl) {
    return control.value.match(this.digitPattern) ? null : { noDigit: true };
  }

  lowercaseLetterValidation(control: AbstractControl) {
    return control.value.match(this.lowercaseLetterPattern) ? null : { noLowercaseLetter: true };
  }

  notEmailValidation(control: AbstractControl) {
    return this.userService.selfData$.pipe(
      map(user => {
        return user.email === control.value ? { isEmail: true } : null;
      }),
      take(1),
    );
  }

  submitNewPassword() {
    const data = this.passwordForm.value;
    this.userService.changePassword(data);
  }
}
