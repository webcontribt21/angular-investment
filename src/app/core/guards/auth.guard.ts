import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { of } from 'rxjs';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

import { ****KeycloakService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard implements CanActivate, CanActivateChild {
  constructor(protected router: Router, private ****KeycloakService: ****KeycloakService, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let allowAccess = true;
    const isTokenExpired: boolean = this.****KeycloakService.keycloakInstance.isTokenExpired();
    if (!this.authenticated || isTokenExpired) {
      allowAccess = false;
      this.****KeycloakService.keycloakInstance.login({
        redirectUri: state.url,
      });
    }

    return of(allowAccess).toPromise();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.canActivate(route, state);
  }
}
