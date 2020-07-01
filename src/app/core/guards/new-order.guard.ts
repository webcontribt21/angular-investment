import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { ApplicationService, OrderService } from '../services';
import { OrderCreationConstraintModalComponent } from '../../shared/modals/order-creation-constraint-modal/order-creation-constraint-modal.component';
import { OrderTypeEnum } from '../enums/order-type.enum';

@Injectable({
  providedIn: 'root',
})
export class NewOrderGuard implements CanActivate, CanActivateChild {
  constructor(private orderService: OrderService, private applicationService: ApplicationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.orderService.orderConstraints$.pipe(
      filter(res => !!res),
      map(res => {
        const orderType: OrderTypeEnum = route.data.orderType;
        if (!orderType || orderType === OrderTypeEnum.referenceAccountChange /* TODO remove */) {
          return true;
        }

        const { canBeCreated } = res[orderType];
        if (!canBeCreated) {
          this.router.navigateByUrl(this.router.url);
          this.applicationService.openModal(OrderCreationConstraintModalComponent, {
            styleClass: 'order-creation-constraint-modal',
          });
        }
        return canBeCreated;
      }),
      take(1),
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
