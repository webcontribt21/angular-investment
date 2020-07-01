// tslint:disable: member-ordering
import { ErrorHandler, Injector, InjectFlags } from '@angular/core';
import { captureException, captureMessage, configureScope, init, Severity, Scope } from '@sentry/browser';
import { Dedupe } from '@sentry/integrations';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationService } from './application.service';
import { I18nService } from './i18n.service';

export const HTTP_HEADER_X_AMZN_REQUESTID = 'X-Amzn-Requestid';
export const HTTP_HEADER_X_AMZN_TRACE_ID = 'X-Amzn-Trace-Id';
export const HTTP_HEADER_X_REQUESTED_WITH = 'X-Requested-With';

export class SentryErrorHandler implements ErrorHandler {
  static throwMessage(msg: string) {
    if (environment.production) {
      captureMessage(msg);
    }
  }

  static throwError(err: any) {
    if (err) {
      if (environment.production) {
        if (err instanceof Error) {
          captureException(err);
        } else {
          captureMessage(JSON.stringify(err));
        }
      } else {
        console.error(err);
      }
    }
  }

  static throwHttpError(err: HttpErrorResponse) {
    if (err) {
      const m = `${err.status} - ${err.url} - ${err.message}`;
      if (environment.production) {
        // this.addBreadcrumb(m, Severity.Error);
        captureException(m);
      } else {
        console.error(m, err);
      }
    }
  }

  static throwErrorEvent(err: ErrorEvent) {
    if (environment.production) {
      captureException(err);
    } else {
      console.error(err);
    }
  }

  static setUser(id: string) {
    SentryErrorHandler.configureScope(scope => {
      scope.setUser({ id });
    });
  }

  static configureScope(f: (scope: Scope) => void) {
    if (environment.production) {
      configureScope(f);
    }
  }

  static addBreadcrumb(message: string, level: Severity = Severity.Debug, object?: any) {
    if (environment.production) {
      configureScope(scope => {
        scope.addBreadcrumb({
          message,
          level,
          data: object,
        });
      });
    }
  }

  private applicationService: ApplicationService = null;
  private i18nService: I18nService = null;

  constructor(private injector: Injector) {
    if (environment.production) {
      init({
        dsn: environment.sentryUrl,
        release: environment.appVersion,
        environment: environment.name,
        whitelistUrls: [environment.domain],
        // tslint:disable-next-line: only-arrow-functions object-literal-shorthand
        integrations: function(integrations) {
          // integrations will be all default integrations
          return integrations.concat(new Dedupe());
        },
      });
    }
  }

  private lazyInjector() {
    if (this.applicationService === null) {
      this.applicationService = this.injector.get(ApplicationService, null, InjectFlags.Optional);
    }
    if (this.i18nService === null) {
      this.i18nService = this.injector.get(I18nService, null, InjectFlags.Optional);
    }
    return this.applicationService !== null && this.i18nService !== null;
  }

  handleError(err: any): void {
    if (this.lazyInjector()) {
      this.applicationService.showErrorToastr(this.i18nService.getInstantTranslation('MESSAGES.SOMETHING_WENT_WRONG'));
    }
    if (environment.production) {
      captureException(err);
    } else {
      console.error(err);
    }
  }
}

export function createErrorHandler() {
  return (injector: Injector) => {
    return new SentryErrorHandler(injector);
  };
}
