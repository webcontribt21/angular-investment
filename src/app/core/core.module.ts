import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { CookieService } from 'ngx-cookie-service';
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock';
import more from 'highcharts/highcharts-more';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import { IntercomModule } from 'ng-intercom';

import { environment } from '../../environments/environment';
import { NgxsStoreModule } from '../ngxs/ngxs.module';
import { MODALS } from '../shared/modals';
import { INTERCEPTORS } from './interceptors';
import { PAGINATION_LIMIT, PAGINATION_LIMIT_VALUE } from './constants/pagination-limit.const';
import { DynamicLocaleId } from './helper';
import { I18nModule } from './i18n/i18n.module';
import { KeycloakModule } from './keycloak/keycloak.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsStoreModule,
    I18nModule,
    KeycloakModule,
    DynamicDialogModule,
    IntercomModule.forRoot({
      appId: environment.intercomId,
      updateOnRouterChange: true,
    }),
    MODALS,
  ],
  providers: [
    INTERCEPTORS,
    MessageService,
    DialogService,
    CookieService,
    DatePipe,
    {
      provide: PAGINATION_LIMIT,
      useValue: PAGINATION_LIMIT_VALUE,
    },
    {
      provide: HIGHCHARTS_MODULES,
      useFactory: () => [stock, more, exporting, exportData],
    },
    { provide: LOCALE_ID, useClass: DynamicLocaleId, deps: [TranslateService] },
  ],
})
export class CoreModule {}
