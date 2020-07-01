import { NgModule } from '@angular/core';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

export const keycloakService = new KeycloakService();

@NgModule({
  imports: [KeycloakAngularModule],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService,
    },
  ],
})
export class KeycloakModule {}
