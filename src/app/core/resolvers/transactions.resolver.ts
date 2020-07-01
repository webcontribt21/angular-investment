import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ApeironService, ApplicationService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class TransactionsResolver implements Resolve<any> {
  constructor(private apeironService: ApeironService, private applicationService: ApplicationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.apeironService.loadTransactions();
    return this.apeironService.transactionsGetRequestState$.pipe(this.applicationService.redirectOnApiResponseError());
  }
}
