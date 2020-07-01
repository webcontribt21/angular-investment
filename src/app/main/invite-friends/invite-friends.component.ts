import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, pluck, withLatestFrom } from 'rxjs/operators';
import { MessageService, SelectItem } from 'primeng/api';

import { CustomerService, I18nService } from '../../core/services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss'],
})
export class InviteFriendsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  code$: Observable<string>;
  link$: Observable<string>;
  showMessageEvent$: Subject<string> = new Subject();

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    private i18nService: I18nService,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.code$ = this.customerService.selectedCustomer$.pipe(
      filter(res => !!res),
      pluck('referrerCode'),
    );
    this.link$ = this.code$.pipe(map(code => environment.websiteDomain + `?r=${code}`));

    this.subscriptions.push(
      this.showMessageEvent$
        .pipe(withLatestFrom(this.i18nService.getTranslationByKeys(['INVITE_FRIENDS_PAGE.COPIED'])))
        .subscribe(([key, [copiedText]]: [string, SelectItem[]]) => {
          this.messageService.clear(key);
          this.messageService.add({
            severity: 'info',
            summary: '',
            detail: copiedText.label,
            life: 1000,
            closable: false,
            key,
          });
        }),

      this.i18nService.getTranslationByKeys(['PAGES_TITLES.INVITE_FRIENDS']).subscribe((item: SelectItem[]) => {
        const [title] = item;
        this.titleService.setTitle(title.label);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  onCodeCopied() {
    this.showMessageEvent$.next('refCodeCopied');
  }
}
