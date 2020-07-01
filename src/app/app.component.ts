import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { MediaQueries } from './core/models';
import { ApplicationService, I18nService, IntercomService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isMobileSub$: Subscription;

  constructor(
    private mediaMatcher: MediaMatcher,
    private appService: ApplicationService,
    private i18nService: I18nService,
    private intercomService: IntercomService,
  ) {}

  ngOnInit() {
    // set default lang
    this.i18nService.init();

    // initialize intercom once on app init
    this.isMobileSub$ = this.appService.isMobile$.pipe(take(1)).subscribe(isMobile => {
      this.intercomService.initIntercom(isMobile);
    });

    // initialize media queries
    MediaQueries.all().forEach(bp => {
      const matcher = this.mediaMatcher.matchMedia(bp.mediaQuery);
      if (!!matcher.addEventListener) {
        matcher.addEventListener('change', event => this.appService.updateAppMedia(bp, event.matches));
      } else {
        // fallback for edge (<=18)
        // tslint:disable-next-line: deprecation
        matcher.addListener(event => this.appService.updateAppMedia(bp, event.matches));
      }
      this.appService.updateAppMedia(bp, matcher.matches);
    });
  }

  ngOnDestroy() {
    if (this.isMobileSub$ && 'unsubscribe' in this.isMobileSub$) {
      this.isMobileSub$.unsubscribe();
    }
  }
}
