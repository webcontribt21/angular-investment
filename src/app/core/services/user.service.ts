import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';

import { ChangeEmailAction, ChangePasswordAction, LoadSelfDataAction, SaveUserAction } from '../../ngxs/user/user.actions';
import { UserGetterState } from '../../ngxs/user';
import { ManagedCustomer, User } from '../models';
import { LanguagesEnum } from '../enums/i18n.enum';
import { IRequestsNestedState } from '../../ngxs/requests/requests.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Select(UserGetterState.getSelfData)
  selfData$: Observable<User>;

  passwordPostRequestState$: Observable<IRequestsNestedState>;

  managedCustomers$: Observable<ManagedCustomer[]> = this.selfData$.pipe(
    filter(res => !!res),
    map(res => res.managedCustomers),
  );

  constructor(private store: Store, private httpClient: HttpClient) {
    this.passwordPostRequestState$ = this.store.select(state => state.requests.passwordPostRequestState);
  }

  loadSelfData(userId: string) {
    this.store.dispatch(new LoadSelfDataAction(userId));
  }

  loadSelfDataRequest(userId: string) {
    return this.httpClient.get('users/' + userId);
  }

  saveUser(user) {
    this.store.dispatch(new SaveUserAction(user));
  }

  saveUserRequest({ phoneNumber, preferredLanguage }: { preferredLanguage: LanguagesEnum; phoneNumber: string }) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json-patch+json');
    const body = [
      { op: 'replace', path: '/phoneNumber', value: phoneNumber },
      { op: 'replace', path: '/preferredLanguage', value: preferredLanguage },
    ];

    return this.selfData$.pipe(
      take(1),
      switchMap((selfData: User) => {
        return this.httpClient.patch('users/' + selfData.id, body, { headers });
      }),
    );
  }

  changePassword(data) {
    this.store.dispatch(new ChangePasswordAction(data));
  }

  changePasswordRequest(payload) {
    return this.httpClient.post('users/password', payload);
  }

  changeEmail(data) {
    this.store.dispatch(new ChangeEmailAction(data));
  }

  changeEmailRequest(payload) {
    return this.httpClient.post('emailverify/email', payload);
  }
}
