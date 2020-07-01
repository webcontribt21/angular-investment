import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { ConfigService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class RiskProfilesResolver implements Resolve<any> {
  constructor(private configService: ConfigService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.configService.riskProfilesGetRequestState$.pipe(
      take(1),
      map(requestState => requestState.loaded),
      switchMap(isLoaded => {
        return isLoaded
          ? of(true)
          : this.configService.loadRiskProfiles().pipe(
              filter(res => res.loaded),
              take(1),
            );
      }),
    );
  }
}
