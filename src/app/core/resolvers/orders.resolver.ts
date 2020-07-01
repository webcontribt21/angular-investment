import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ApplicationService, OrderService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class OrdersResolver implements Resolve<any> {
  constructor(private orderService: OrderService, private applicationService: ApplicationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.orderService.loadOrders();
    return this.orderService.ordersGetRequestState$.pipe(this.applicationService.redirectOnApiResponseError());
  }
}
