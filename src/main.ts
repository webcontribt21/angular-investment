import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { isOldBrowser } from './app/shared/utils';
import { environment } from './environments/environment';

if (environment.production) {
  // add Google Tag Manager script to <head>
  const script = document.createElement('script');
  const code = `
    dataLayer = [];
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXX');
  `;
  script.innerHTML = code.replace('GTM-XXXXX', environment.gtmId);
  document.head.appendChild(script);
  enableProdMode();
}

declare var isValidBrowser: boolean;

if (!isOldBrowser()) {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}
