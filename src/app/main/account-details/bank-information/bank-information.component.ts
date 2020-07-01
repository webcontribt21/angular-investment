import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';

import { CustomerService, I18nService, IntercomService } from '../../../core/services';
import { Customer } from '../../../core/models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bank-information',
  templateUrl: './bank-information.component.html',
  styleUrls: ['./bank-information.component.scss'],
})
export class BankInformationComponent implements OnInit {
  selectedCustomer$: Observable<Customer> = this.customerService.selectedCustomer$;

  email = 'service@****.de';
  mailto$: Observable<string>;

  constructor(
    private customerService: CustomerService,
    private i18nService: I18nService,
    private sanitizer: DomSanitizer,
    private intercom: IntercomService,
  ) {}

  ngOnInit() {
    this.mailto$ = this.i18nService
      .getTranslationByKeys(['ACCOUNT_DETAILS_PAGE.BANK.MAILTO.SUBJECT', 'ACCOUNT_DETAILS_PAGE.BANK.MAILTO.BODY'])
      .pipe(
        map(([subject, body]) => {
          return this.sanitizer.sanitize(
            4,
            `mailto:${this.email}?subject=${encodeURIComponent(subject.label)}&body=${encodeURIComponent(body.label)}`,
          );
        }),
      );
  }

  openChat() {
    this.intercom.openWindow();
  }
}
