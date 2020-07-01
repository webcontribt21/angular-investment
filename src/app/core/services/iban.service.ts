import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, switchMap, first, take, withLatestFrom } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';

import { IbanGetterState } from '../../ngxs/iban';
import { IbanValidationResult, ValidatedIban } from '../models/iban.model';
import { ValidateIbanAction } from '../../ngxs/iban/iban.actions';

@Injectable({
  providedIn: 'root',
})
export class IbanService {
  @Select(IbanGetterState.getIbans)
  iban$: Observable<ValidatedIban[]>;

  constructor(private store: Store, private httpClient: HttpClient) {}

  validate(iban: string) {
    this.store.dispatch(new ValidateIbanAction(this.normalize(iban)));
    // const found = ibans.find(storedIban => storedIban.iban === normalizedIban);
  }

  validationRequest(iban: string): Observable<IbanValidationResult> {
    const normalized = this.normalize(iban);
    const optionsString = '?getBIC=true&validateBankCode=true';
    const url = 'https://openiban.****-internal.com/validate/' + normalized + optionsString;
    return this.httpClient.get<IbanValidationResult>(url).pipe(
      catchError(() => {
        const valid = normalized.length === 22 && normalized.startsWith('DE') && !isNaN(parseInt(normalized.slice(2), 10));
        return of({ valid, messages: [], iban: normalized });
      }),
    );
  }

  normalize(iban: string) {
    const upperCased = typeof iban === 'string' && iban.length > 0 ? iban.toUpperCase() : '';
    const whitespaceFree = removeStringSpaces(upperCased);
    return whitespaceFree;
  }
}

function removeStringSpaces(text: string): string {
  return text ? text.replace(/\s+/g, '') : '';
}
