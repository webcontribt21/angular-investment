import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { UploadService } from '../services';
import { AddressComponent } from '../../main/orders/new-order/address/address.component';

@Injectable({
  providedIn: 'root',
})
export class ClearUploadGuard implements CanDeactivate<AddressComponent> {
  constructor(private uploadService: UploadService) {}

  canDeactivate(
    component: AddressComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.uploadService.clearUpload();
    return true;
  }
}
