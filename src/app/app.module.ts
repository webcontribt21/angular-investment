import { ApplicationRef, DoBootstrap, NgModule, ErrorHandler, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { first } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { keycloakService } from './core/keycloak/keycloak.module';
import { ****KeycloakService } from './core/services';
import { createErrorHandler } from './core/services/error.handler';
import { SpinnerModule } from './spinner/spinner.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, SpinnerModule, CommonModule],
  providers: [{ provide: ErrorHandler, useFactory: createErrorHandler(), deps: [Injector] }],
  entryComponents: [AppComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private ****KeycloakService: ****KeycloakService) {}

  ngDoBootstrap(appRef: ApplicationRef) {
    keycloakService
      .init({
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
        initOptions: {
          onLoad: 'login-required',
        },
        bearerExcludedUrls: ['/srv-common-buckets-useruploadsbucket', 'openiban.****-internal.com'],
      })
      .then(() => {
        if (!environment.production) {
          console.log('[ngDoBootstrap] bootstrap app');
        }
        this.****KeycloakService
          .init()
          .pipe(first())
          .subscribe(success => {
            if (success) {
              appRef.bootstrap(AppComponent);
            }
          });
      })
      .catch(error => {
        console.error('[ngDoBootstrap] init Keycloak failed', error);
      });
  }
}
