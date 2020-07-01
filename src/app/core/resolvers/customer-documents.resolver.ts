import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ApplicationService, CustomerService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class CustomerDocumentsResolver implements Resolve<any> {
  constructor(private customerService: CustomerService, private applicationService: ApplicationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.customerService.loadCustomerDocuments();
    return this.customerService.customerDocumentsGetRequestState$.pipe(this.applicationService.redirectOnApiResponseError());
  }
}
