import { Injectable } from '@angular/core';

import { KeycloakService } from 'keycloak-angular';
import * as Keycloak from 'keycloak-js';

import { UserService } from './user.service';
import { CustomerService } from './customer.service';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { SentryErrorHandler } from './error.handler';

@Injectable({
  providedIn: 'root',
})
export class ****KeycloakService {
  keycloakInstance: Keycloak.KeycloakInstance;

  constructor(private keycloakService: KeycloakService, private userService: UserService, private customerService: CustomerService) {}

  // executed once before app.component is bootstrapped
  init() {
    this.keycloakInstance = this.keycloakService.getKeycloakInstance();

    // get info from jwt token
    const tokenParsed: any = this.keycloakInstance.tokenParsed;

    // redirect if no customers added or email is not verified
    const activeManagedCustomerIds: string[] = tokenParsed.active_managed_customer_ids;
    const isCustomerAdded: boolean = activeManagedCustomerIds && !!activeManagedCustomerIds.length;
    if (!isCustomerAdded || !tokenParsed.email_verified) {
      this.keycloakInstance.login({
        redirectUri: environment.onboardingDomain,
      });
      return of(false);
    } else {
      // load user info
      const userId: string = tokenParsed.user_id;
      SentryErrorHandler.setUser(userId);
      this.userService.loadSelfData(userId);

      // load customer info
      const defaultCustomerId: string = activeManagedCustomerIds.shift();
      this.customerService.loadDefaultCustomer(defaultCustomerId, activeManagedCustomerIds);
      return of(true);
    }
  }

  logout() {
    if (!this.keycloakInstance) {
      return;
    }
    this.keycloakInstance.logout();
  }
}
