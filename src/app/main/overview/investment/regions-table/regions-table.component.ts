import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Allocation, AssetCategorized, Portfolio, AssetRegion, Translatable } from '../../../../core/models';
import { ApplicationService, ProductsService, ConfigService } from '../../../../core/services';
import { saintLague } from '../../../../shared/utils';
import { RegionColorsEnum } from '../class-colors.enum';

class RegionsCategorized {
  amount: number;
  ratio: number;
  name: Translatable;
  color: string;
}

@Component({
  selector: 'app-regions-table',
  templateUrl: './regions-table.component.html',
  styleUrls: ['./regions-table.component.scss'],
})
export class RegionsTableComponent implements OnInit {
  @Input()
  portfolio$: Observable<Portfolio> = null;

  percentage$: Observable<string>;
  portfolioAllocation$: Observable<Allocation[]>;
  tableData$: Observable<RegionsCategorized[]>;
  isMobile$: Observable<boolean>;

  currentLiquidity = 0;
  currentBalance = 0;
  totalAmount = 0;

  constructor(
    private configService: ConfigService,
    private productService: ProductsService,
    private applicationService: ApplicationService,
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
      this.configService.assetRegions$,
    ]).pipe(
      map(([portfolio, products, regions]: [Portfolio, AssetCategorized[], AssetRegion[]]) => {
        const assetRegions: Map<AssetRegion, [number, number]> = new Map();
        products.forEach(allocation => {
          const security = allocation.security;
          const strategySecurityRatio = allocation.ratio;
          Object.keys(security.assetRegions).forEach(regionKey => {
            const region = regions.find(x => x.code === regionKey);
            const securityRegionRatio = security.assetRegions[region.code];
            const ratio = strategySecurityRatio * securityRegionRatio;
            const amount = allocation.amount * securityRegionRatio;
            const prevNumbers = assetRegions.has(region) ? assetRegions.get(region) : [0, 0];
            const prevRatio = prevNumbers[0];
            const prevAmount = prevNumbers[1];
            assetRegions.set(region, [ratio + prevRatio, amount + prevAmount]);
          });
        });
        this.currentLiquidity = portfolio.currentLiquidity;
        this.currentBalance = portfolio.currentBalance;
        this.totalAmount = this.currentBalance - this.currentLiquidity;
        const sorted = (Array.from(assetRegions) as [AssetRegion, [number, number]][])
          .map(([a, r]) => {
            return {
              name: a.label,
              ratio: r[0],
              color: RegionColorsEnum[a.code] || RegionColorsEnum.DEFAULT,
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
