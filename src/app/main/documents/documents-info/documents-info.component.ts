import { Component, OnInit } from '@angular/core';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationService, CustomerService } from '../../../core/services';
import { CustomerDocument } from '../../../core/models';

@Component({
  selector: 'app-documents-info',
  templateUrl: './documents-info.component.html',
  styleUrls: ['./documents-info.component.scss'],
})
export class DocumentsInfoComponent implements OnInit {
  isMobile$: Observable<boolean>;
  isDocumentsInfoShown$: Observable<boolean>;
  quarterlyReport$: Observable<CustomerDocument>;
  taxStatementReport$: Observable<CustomerDocument>;

  constructor(private appService: ApplicationService, private customerService: CustomerService) {}

  ngOnInit() {
    this.isMobile$ = this.appService.isMobile$;
    this.quarterlyReport$ = this.customerService.latestDocuments$.pipe(
      map((docs: CustomerDocument[]) => {
        const quarterlyReportDoc = docs.find(doc => doc.category === 'QUARTERLY_REPORT');
        return quarterlyReportDoc;
      }),
    );

    this.taxStatementReport$ = this.customerService.latestDocuments$.pipe(
      map((docs: CustomerDocument[]) => {
        const taxReportDoc = docs.find(doc => doc.category === 'ANNUAL_TAX_STATEMENT');
        return taxReportDoc;
      }),
    );

    this.isDocumentsInfoShown$ = combineLatest(this.quarterlyReport$, this.taxStatementReport$).pipe(
      map(([quarterlyReport, taxStatementReport]) => !!quarterlyReport || !!taxStatementReport),
    );
  }
}
