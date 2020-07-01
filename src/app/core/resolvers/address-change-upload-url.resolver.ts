import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ApplicationService, UploadService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AddressChangeUploadUrlResolver implements Resolve<any> {
  constructor(private uploadService: UploadService, private applicationService: ApplicationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.uploadService.loadUploadLink({ path: 'address-change' });
    return this.uploadService.uploadUrlRequestState$.pipe(this.applicationService.redirectOnApiResponseError());
  }
}
