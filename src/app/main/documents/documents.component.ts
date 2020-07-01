import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { filter, map, skip } from 'rxjs/operators';

import { ApplicationService, CustomerService, I18nService } from '../../core/services';
import { CustomerDocument } from '../../core/models';
import { SelectItem } from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  isTabletsHorizontal$: Observable<boolean>;
  isDocumentsEmpty$: Observable<boolean>;

  constructor(
    private customerService: CustomerService,
    private appService: ApplicationService,
    private i18nService: I18nService,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.isTabletsHorizontal$ = this.appService.isTabletsHorizontal$;
    this.isDocumentsEmpty$ = this.customerService.customerDocument$.pipe(
      map((documents: CustomerDocument[]) => !documents || !documents.length || documents.length === 0),
    );

    this.subscriptions.push(
      // load transactions on customer switch
      this.customerService.selectedCustomer$
        .pipe(
          filter(res => !!res),
          skip(1),
        )
        .subscribe(() => {
          this.customerService.loadCustomerDocuments();
          this.customerService.loadCustomerLatestDocument();
        }),

      this.i18nService.getTranslationByKeys(['PAGES_TITLES.DOCUMENTS']).subscribe((item: SelectItem[]) => {
        const [title] = item;
        this.titleService.setTitle(title.label);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }
}
