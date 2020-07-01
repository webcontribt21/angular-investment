import { NgModule } from '@angular/core';
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CurrencyMaskConfig, NgxCurrencyModule } from 'ngx-currency';

// create http client instance to avoid interceptors and get json from client
export function rawHttpClientFactory(handler: HttpHandler) {
  return new HttpClient(handler);
}

export abstract class RawHttpClient extends HttpClient {}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: RawHttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json?cb=' + new Date().getTime());
}

export const customCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  allowZero: false,
  decimal: '.',
  precision: 0,
  prefix: '',
  suffix: '',
  thousands: '.',
  nullable: false,
};

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [RawHttpClient],
      },
    }),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  providers: [
    {
      provide: RawHttpClient,
      useFactory: rawHttpClientFactory,
      deps: [HttpBackend],
    },
  ],
})
export class I18nModule {}
