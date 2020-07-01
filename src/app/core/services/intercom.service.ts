import { Injectable } from '@angular/core';

import { Intercom } from 'ng-intercom';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IntercomService {
  constructor(public intercom: Intercom) {}

  initIntercom(hideDefaultLauncher: boolean) {
    this.intercom.boot({
      app_id: environment.intercomId,
      hide_default_launcher: hideDefaultLauncher,
      // Supports all optional configuration.
      widget: {
        activator: '#intercom',
      },
    });
  }

  showIntercom() {
    this.intercom.showMessages();
  }

  openWindow() {
    this.intercom.show();
  }
}
