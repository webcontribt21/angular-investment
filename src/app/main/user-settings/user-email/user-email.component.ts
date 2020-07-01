import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { User } from '../../../core/models';
import { UserService } from '../../../core/services';

@Component({
  selector: 'app-user-email',
  templateUrl: './user-email.component.html',
  styleUrls: ['./user-email.component.scss'],
})
export class UserEmailComponent implements OnInit {
  user$: Observable<User>;

  emailPattern = /^[-a-zA-Z0-9~!$%^&*_=+}{\'?]+(\.[-a-zA-Z0-9~!$%^&*_=+}{\'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)+)$/;
  emailControl: FormControl;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user$ = this.userService.selfData$.pipe(filter((res: User) => !!res));

    this.emailControl = new FormControl(null, {
      validators: [Validators.pattern(this.emailPattern), Validators.required],
      asyncValidators: [this.sameEmailValidation.bind(this)],
      updateOn: 'change',
    });
  }

  sameEmailValidation(control: AbstractControl) {
    return this.user$.pipe(
      take(1),
      map(user => {
        return user.email === control.value ? { isSame: true } : null;
      }),
    );
  }

  submitNewEmail() {
    const data: { newEmail: string } = {
      newEmail: this.emailControl.value,
    };
    this.userService.changeEmail(data);
  }
}
