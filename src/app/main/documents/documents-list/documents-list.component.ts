import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { CustomerDocument, InboxDocumentCategory, Pagination } from '../../../core/models';
import { ApeironService, ConfigService, CustomerService, I18nService } from '../../../core/services';

interface CustomerDocumentExtended extends CustomerDocument {
  category: string;
  source: string;
}

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss'],
})
export class DocumentsListComponent implements OnInit {
  documents$: Observable<CustomerDocumentExtended[]>;
  documentsPagination$: Observable<Pagination>;

  constructor(
    private apeironService: ApeironService,
    private configService: ConfigService,
    private i18nService: I18nService,
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.documents$ = this.i18nService.selectedLang$.pipe(
      switchMap(selectedLang => {
        return this.customerService.customerDocument$.pipe(
          withLatestFrom(this.configService.inboxDocumentCategories$),
          map(([documents, categories]) => {
            return documents.map((document: CustomerDocument) => {
              const currentCategory: InboxDocumentCategory = categories.find(cat => {
                return document.category === cat.code;
              });
              return {
                ...document,
                category: currentCategory.label[selectedLang],
                source: currentCategory.sourceLabel[selectedLang],
              };
            });
          }),
        );
      }),
    );
    this.documentsPagination$ = this.customerService.documentsPaging$;
  }

  onPageChanged(newOffset) {
    this.customerService.loadCustomerDocuments(newOffset);
  }
}
