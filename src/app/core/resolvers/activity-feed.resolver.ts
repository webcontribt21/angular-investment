import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { NotificationsService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class ActivityFeedResolver implements Resolve<any> {
  constructor(private notificationsService: NotificationsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.notificationsService.activityFeedGetRequestState$.pipe(
      take(1),
      map(requestState => requestState.loaded),
      switchMap(isLoaded => {
        return isLoaded
          ? of(true)
          : this.notificationsService.loadActivityFeed().pipe(
              filter(res => !!res.loaded),
              take(1),
            );
      }),
    );
  }
}
