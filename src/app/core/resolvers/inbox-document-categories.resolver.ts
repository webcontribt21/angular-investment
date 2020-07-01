import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { ConfigService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class InboxDocumentCategoriesResolver implements Resolve<any> {
  constructor(private configService: ConfigService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.configService.inboxDocumentCategoriesGetRequestState$.pipe(
      take(1),
      map(requestState => requestState.loaded),
      switchMap(isLoaded => {
        return isLoaded
          ? of(true)
          : this.configService.loadInboxDocumentCategories().pipe(
              filter(res => res.loaded),
              take(1),
            );
      }),
    );
  }
}
