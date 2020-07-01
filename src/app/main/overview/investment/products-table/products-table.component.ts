import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Allocation, AssetCategorized, Portfolio } from '../../../../core/models';
import { ApplicationService, ProductsService } from '../../../../core/services';
import { saintLague } from '../../../../shared/utils';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
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
export class ProductsTableComponent implements OnInit {
  @Input()
  portfolio$: Observable<Portfolio> = null;

  percentage$: Observable<string>;
  portfolioAllocation$: Observable<Allocation[]>;
  tableData$: Observable<AssetCategorized[]>;
  isMobile$: Observable<boolean>;

  currentLiquidity = 0;
  currentBalance = 0;
  totalAmount = 0;

  constructor(private productService: ProductsService, private applicationService: ApplicationService) {}

  ngOnInit() {
    this.percentage$ = this.applicationService.isMobile$.pipe(map((isMobile: boolean) => isMobile && '%'));
    this.portfolioAllocation$ = this.portfolio$.pipe(
      filter(res => !!res),
      map((portfolio: Portfolio) => portfolio.currentAllocation),
    );

    this.tableData$ = combineLatest([this.portfolio$, this.productService.getProducts(this.portfolioAllocation$)]).pipe(
      map(([portfolio, products]: [Portfolio, AssetCategorized[]]) => {
        this.currentLiquidity = portfolio.currentLiquidity;
        this.currentBalance = portfolio.currentBalance;
        this.totalAmount = this.currentBalance - this.currentLiquidity;
        return saintLague(
          products,
          o => o.amount,
          (o, v) => {
            o.amount = v / 100;
            return o;
          },
          Math.floor(this.totalAmount * 100),
        );
      }),
    );

    this.isMobile$ = this.applicationService.isMobile$;
  }
}
