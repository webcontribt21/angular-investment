import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';

import { I18nService } from '../../core/services';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  subscriptions: Subscription[] = [];

  constructor(private i18nService: I18nService, private titleService: Title) {}

  ngOnInit() {
    this.subscriptions.push(
      this.i18nService.getTranslationByKeys(['PAGES_TITLES.ACCOUNT_DETAILS']).subscribe((item: SelectItem[]) => {
        const [title] = item;
        this.titleService.setTitle(title.label);
      }),
    );
  }
}
