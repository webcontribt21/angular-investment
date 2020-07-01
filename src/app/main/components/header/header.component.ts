import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { RouterNavigation } from '@ngxs/router-plugin';

import { ApplicationService } from '../../../core/services';
import { delay, pairwise, filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  isDesktop$: Observable<boolean> = this.applicationService.isDesktop$;
  isOpenLeftMenu$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private actions$: Actions, private applicationService: ApplicationService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.actions$.pipe(ofActionSuccessful(RouterNavigation)).subscribe(() => {
        this.closeMenu();
      }),
    );

    this.subscriptions.push(
      this.applicationService.isDesktop$
        .pipe(
          pairwise(),
          filter(([prev, curr]) => !prev && curr),
        )
        .subscribe(() => this.closeMenu()),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  openLeftMenu() {
    this.isOpenLeftMenu$.next(true);
  }

  closeMenu() {
    this.isOpenLeftMenu$.next(false);
  }
}
