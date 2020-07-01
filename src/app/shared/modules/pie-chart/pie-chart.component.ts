import { Component, Input, OnInit } from '@angular/core';

import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as Highcharts from 'highcharts';

import { ConfigService, I18nService, ProductsService } from '../../../core/services';
import { Allocation, AssetIndustry } from '../../../core/models';
import { ClassColorsEnum, IndustryColorsEnum } from '../../../main/overview/investment/class-colors.enum';
import { LanguagesEnum } from '../../../core/enums/i18n.enum';
import { PieChartData } from './interfaces/pie-chart-data.interface';
import { AssetGrouped } from './interfaces/asset-grouped.interface';
import { saintLague } from '../../utils';

export enum PieChartType {
  Assets = 'assets',
  Industries = 'industries',
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input()
  allocation$: Observable<Allocation[]> = null;

  @Input()
  type: PieChartType = PieChartType.Assets;

  PieChartType = PieChartType;

  assetsGrouped: AssetGrouped[];

  chart$: Observable<Chart>;

  constructor(private configService: ConfigService, private productsService: ProductsService, private i18nService: I18nService) {}

  ngOnInit() {
    this.chart$ = this.i18nService.selectedLang$.pipe(
      switchMap((selectedLang: LanguagesEnum) => {
        return this.allocation$.pipe(
          this.productsService.getExtendedAllocation(),
          withLatestFrom(this.configService.assetIndustries$),
          map(([extendedAllocation, industries]) => {
            // Build data for chart
            let chartData: PieChartData[];
            if (this.type === PieChartType.Assets) {
              const assetsGrouped: { [key: string]: AssetGrouped } = {};
              chartData = extendedAllocation.reduce((acc, loc) => {
                // Set data for chart
                acc.push({
                  name: loc.assetLabel.label[selectedLang],
                  y: loc.ratio * 100,
                  color: new Highcharts.Color(ClassColorsEnum[loc.assetClass.code] || ClassColorsEnum.DEFAULT).get(),
                  assetClassCode: loc.assetClass.code,
                });

                // Set data for legend
                let currentAssetGrouped: AssetGrouped = assetsGrouped[loc.assetClass.code];
                if (currentAssetGrouped) {
                  currentAssetGrouped.amount += loc.amount;
                  currentAssetGrouped.ratio += loc.ratio;
                } else {
                  currentAssetGrouped = {
                    amount: loc.amount,
                    ratio: loc.ratio,
                    assetClass: loc.assetClass.label[selectedLang],
                    classCode: loc.assetClass.code,
                    color: new Highcharts.Color(ClassColorsEnum[loc.assetClass.code] || ClassColorsEnum.DEFAULT).get(),
                  };
                }
                assetsGrouped[loc.assetClass.code] = currentAssetGrouped;
                return acc;
              }, []);

              chartData = Object.values(chartData)
                .sort((a, b) => b.y - a.y)
                .sort((a, b) => {
                  // sort by asset class
                  const sumA = Object.values(chartData)
                    .filter(x => x.color === a.color)
                    .reduce((p, c) => p + c.y, 0);
                  const sumB = Object.values(chartData)
                    .filter(x => x.color === b.color)
                    .reduce((p, c) => p + c.y, 0);
                  return sumB - sumA;
                });

              // set assetsGrouped values
              this.assetsGrouped = Object.values(assetsGrouped).sort((a, b) => b.amount - a.amount);
            } else {
              const assetIndustries: Map<AssetIndustry, number> = new Map();
              extendedAllocation.forEach(allocation => {
                const security = allocation.security;
                const strategySecurityRatio = allocation.ratio;
                Object.keys(security.assetIndustries).forEach(industryKey => {
                  const industry = industries.find(x => x.code === industryKey);
                  const securityIndustryRatio = security.assetIndustries[industry.code];
                  const ratio = strategySecurityRatio * securityIndustryRatio;
                  const prevRatio = assetIndustries.has(industry) ? assetIndustries.get(industry) : 0;
                  assetIndustries.set(industry, ratio + prevRatio);
                });
              });
              chartData = saintLague(
                (Array.from(assetIndustries) as [AssetIndustry, number][]).map(([a, r]) => {
                  return {
                    name: a.label[selectedLang],
                    y: r,
                    color: new Highcharts.Color(IndustryColorsEnum[a.code] || IndustryColorsEnum.DEFAULT).get(),
                  };
                }),
                o => o.y,
                (o, v) => {
                  o.y = v / 100;
                  return o;
                },
                10000,
              ).sort((a, b) => b.y - a.y);
            }
            // create pie chart
            const chart: Chart = new Chart({
              chart: {
                type: 'pie',
                height: 235,
                spacingTop: 0,
                marginTop: 0,
              },
              title: {
                text: '',
              },
              plotOptions: {
                pie: {
                  cursor: 'pointer',
                  showInLegend: false,
                  dataLabels: {
                    enabled: false,
                  },
                  size: '100%',
                  borderWidth: '4',
                },
              },
              tooltip: {
                formatter() {
                  return this.key + ': ' + Number(this.y).toFixed(2) + '%';
                },
              },
              credits: {
                enabled: false,
              },
              series: [
                {
                  colorByPoint: true,
                  minPointSize: 10,
                  height: '100%',
                  innerSize: '82%',
                  data: chartData,
                },
              ],
              exporting: {
                enabled: false,
              },
            } as any);

            return chart;
          }),
        );
      }),
    );
  }
}
