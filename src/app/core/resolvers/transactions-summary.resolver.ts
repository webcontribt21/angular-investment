import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ApeironService, ApplicationService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class TransactionsSummaryResolver implements Resolve<any> {
  constructor(private apeironService: ApeironService, private applicationService: ApplicationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.apeironService.loadTransactionsSummary();
    return this.apeironService.transactionsSummaryGetRequestState$.pipe(this.applicationService.redirectOnApiResponseError());
  }
}
