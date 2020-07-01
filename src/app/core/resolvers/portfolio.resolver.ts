import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { ApeironService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class PortfolioResolver implements Resolve<any> {
  constructor(private apeironService: ApeironService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.apeironService.portfolioGetRequestState$.pipe(
      take(1),
      map(requestState => requestState.loaded),
      switchMap(isLoaded => {
        return isLoaded
          ? of(true)
          : this.apeironService.loadPortfolio().pipe(
              filter(res => !!res.loaded),
              take(1),
            );
      }),
    );
  }
}
