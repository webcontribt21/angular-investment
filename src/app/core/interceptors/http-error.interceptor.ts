import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { configureScope } from '@sentry/browser';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map, withLatestFrom, switchMapTo } from 'rxjs/operators';

import { ApplicationService, I18nService, ConfigService } from '../services';
import { SentryErrorHandler, HTTP_HEADER_X_AMZN_REQUESTID, HTTP_HEADER_X_AMZN_TRACE_ID } from '../services/error.handler';
import { HttpViolation, Violation } from '../models';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private violations$: Observable<Violation[]>;

  constructor(private applicationService: ApplicationService, private i18nService: I18nService, private configService: ConfigService) {
    this.violations$ = this.configService.violations$;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        configureScope(scope => {
          scope.setTag('request_id', error.headers.get(HTTP_HEADER_X_AMZN_REQUESTID) || '');
          scope.setTag('trace_id', error.headers.get(HTTP_HEADER_X_AMZN_TRACE_ID) || '');
        });
        if (error.error instanceof ErrorEvent) {
          // client-side error
          SentryErrorHandler.throwErrorEvent(error.error);
        } else {
          // server-side error
          SentryErrorHandler.throwHttpError(error);
        }
        return this.getErrorMessage(error.error).pipe(
          tap(messages => this.applicationService.showErrorToastr(messages[0])),
          switchMapTo(throwError(error.error)),
        );
      }),
    );
  }

  private getErrorMessage(data): Observable<string[]> {
    if (data && data.violations) {
      return this.i18nService.selectedLang$.pipe(
        withLatestFrom(
          this.violations$,
          this.i18nService.getTranslationByKeys(['MESSAGES.SOMETHING_WENT_WRONG']).pipe(map(x => [x[0].label])),
        ),
        map(([lang, violations, defaultValue]) => {
          const httpViolations: HttpViolation[] = data.violations;
          const returnValue = httpViolations
            .map(h => violations.find(v => v.code === h.code))
            .filter(x => !!x)
            .map(violation => violation.label[lang]);
          return returnValue.length > 0 ? returnValue : defaultValue;
        }),
      );
    } else {
      return this.i18nService.getTranslationByKeys(['MESSAGES.SOMETHING_WENT_WRONG']).pipe(map(x => [x[0].label]));
    }
  }
}
