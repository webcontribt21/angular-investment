import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { filter, map, switchMapTo, take } from 'rxjs/operators';

import { CustomerService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class CustomerLatestDocumentResolver implements Resolve<any> {
  constructor(private customerService: CustomerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.customerService.loadCustomerLatestDocument();
    return this.customerService.customerLatestDocumentsGetRequestState$.pipe(
      map(requestState => requestState.loading),
      filter(res => !!res),
      switchMapTo(
        this.customerService.customerLatestDocumentsGetRequestState$.pipe(
          map(requestState => requestState.loaded),
          filter(res => !!res),
        ),
      ),
      take(1),
    );
  }
}
