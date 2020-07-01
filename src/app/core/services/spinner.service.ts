import { Injectable } from '@angular/core';

import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { RequestsState } from '../../ngxs/requests/requests.state';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  @Select(RequestsState.loadingStatus)
  isLoading$: Observable<boolean>;

  constructor() {}
}
