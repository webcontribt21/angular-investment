import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { Allocation, AssetCategorized } from '../../../core/models';
import { ApplicationService, CustomerService, InterviewService, ProductsService } from '../../../core/services';

@Component({
  selector: 'app-products-detailed-table',
  templateUrl: './products-detailed-table-modal.component.html',
  styleUrls: ['./products-detailed-table-modal.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state(
        'void',
        style({
          opacity: 0,
        }),
      ),
      state(
        'active',
        style({
          opacity: 1,
        }),
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
})
export class ProductsDetailedTableModalComponent implements OnInit {
  allocation$: Observable<Allocation[]>;
  percentage$: Observable<string>;
  tableData$: Observable<AssetCategorized[]>;
  strategyToDisplay$: Observable<string>;
  isMobile$: Observable<boolean>;

  constructor(
    private productService: ProductsService,
    private applicationService: ApplicationService,
    private interviewService: InterviewService,
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.allocation$ = this.interviewService.selectedStrategy$.pipe(pluck('allocations'));
    this.percentage$ = this.applicationService.isMobile$.pipe(map((isMobile: boolean) => isMobile && '%'));
    this.tableData$ = this.productService.getProducts(this.allocation$);
    this.strategyToDisplay$ = this.interviewService.selectedStrategy$.pipe(pluck('labelSuffix'));
    this.isMobile$ = this.applicationService.isMobile$;
  }
}
