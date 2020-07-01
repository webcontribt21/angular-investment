import { Component, Input, OnInit } from '@angular/core';

import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Allocation, AssetCategorized, Portfolio, Industry, Translatable, AssetIndustry } from '../../../../core/models';
import { ApplicationService, ProductsService, ConfigService } from '../../../../core/services';
import { saintLague } from 'src/app/shared/utils';
import { IndustryColorsEnum } from '../class-colors.enum';

class IndustryCategorized {
  amount: number;
  ratio: number;
  name: Translatable;
  color: string;
}

@Component({
  selector: 'app-industries-table',
  templateUrl: './industries-table.component.html',
  styleUrls: ['./industries-table.component.scss'],
})
export class IndustriesTableComponent implements OnInit {
  @Input()
  portfolio$: Observable<Portfolio> = null;

  percentage$: Observable<string>;
  portfolioAllocation$: Observable<Allocation[]>;
  tableData$: Observable<IndustryCategorized[]>;
  isMobile$: Observable<boolean>;

  currentLiquidity = 0;
  currentBalance = 0;
  totalAmount = 0;

  constructor(
    private productService: ProductsService,
    private applicationService: ApplicationService,
    private configService: ConfigService,
  ) {}

  ngOnInit() {
    this.percentage$ = this.applicationService.isMobile$.pipe(map((isMobile: boolean) => isMobile && '%'));
    this.portfolioAllocation$ = this.portfolio$.pipe(
      filter(res => !!res),
      map((portfolio: Portfolio) => portfolio.currentAllocation),
    );

    this.tableData$ = combineLatest([
      this.portfolio$,
      this.productService.getProducts(this.portfolioAllocation$),
      this.configService.assetIndustries$,
    ]).pipe(
      map(([portfolio, products, industries]: [Portfolio, AssetCategorized[], AssetIndustry[]]) => {
        const assetIndustries: Map<AssetIndustry, [number, number]> = new Map();
        products.forEach(allocation => {
          const security = allocation.security;
          const strategySecurityRatio = allocation.ratio;
          Object.keys(security.assetIndustries).forEach(industryKey => {
            const industry = industries.find(x => x.code === industryKey);
            const securityIndustryRatio = security.assetIndustries[industry.code];
            const ratio = strategySecurityRatio * securityIndustryRatio;
            const amount = allocation.amount * securityIndustryRatio;
            const prevNumbers = assetIndustries.has(industry) ? assetIndustries.get(industry) : [0, 0];
            const prevRatio = prevNumbers[0];
            const prevAmount = prevNumbers[1];
            assetIndustries.set(industry, [ratio + prevRatio, amount + prevAmount]);
          });
        });
        this.currentLiquidity = portfolio.currentLiquidity;
        this.currentBalance = portfolio.currentBalance;
        this.totalAmount = this.currentBalance - this.currentLiquidity;

        const sorted = (Array.from(assetIndustries) as [AssetIndustry, [number, number]][])
          .map(([a, r]) => {
            return {
              name: a.label,
              ratio: r[0],
              color: IndustryColorsEnum[a.code] || IndustryColorsEnum.DEFAULT,
              amount: r[1],
            };
          })
          .sort((x, y) => y.amount - x.amount);
        const roundedPercentage = saintLague(
          sorted,
          o => o.ratio,
          (o, v) => {
            o.ratio = v / 10000;
            return o;
          },
          10000,
        );
        const roundedAmounts = saintLague(
          roundedPercentage,
          o => o.amount,
          (o, v) => {
            o.amount = v / 100;
            return o;
          },
          Math.floor(this.totalAmount * 100),
        );
        return roundedAmounts;
      }),
    );

    this.isMobile$ = this.applicationService.isMobile$;
  }
}
