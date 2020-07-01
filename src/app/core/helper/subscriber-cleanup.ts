import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class SubscriberCleanup implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor() {}

  addSubscription(s: Subscription) {
    this.subscriptions.push(s);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      if (s) {
        s.unsubscribe();
      }
    });
  }
}
