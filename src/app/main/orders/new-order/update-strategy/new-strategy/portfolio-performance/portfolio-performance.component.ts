import { AfterViewInit, Component, OnInit } from '@angular/core';

import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
import { SeriesLineOptions, SeriesOptions } from 'highcharts';
import { SelectItem } from 'primeng/api';

import { ConfigService, I18nService } from '../../../../../../core/services';
import { PerformanceProjection } from '../../../../../../core/models';
import { LineColorsEnum } from './line-colors.enum';
import { CurrencySignPipe } from '../../../../../../shared/pipes/currency-sign-pipe/currency-sign.pipe';
import { LanguagesEnum } from '../../../../../../core/enums/i18n.enum';

@Component({
  selector: 'app-portfolio-performance',
  templateUrl: './portfolio-performance.component.html',
  styleUrls: ['./portfolio-performance.component.scss'],
})
export class PortfolioPerformanceComponent implements OnInit, AfterViewInit {
  chartValues$: Observable<{ options: Highcharts.Options; series: SeriesOptions[] }>;
  rerenderChartEvent$: Subject<void> = new Subject();

  constructor(private configService: ConfigService, private i18nService: I18nService, private currencySignPipe: CurrencySignPipe) {}

  ngOnInit() {
    this.chartValues$ = combineLatest(
      this.rerenderChartEvent$,
      this.configService.performanceProjections$,
      this.i18nService.getTranslationByKeys([
        'UPDATE_STRATEGY_PAGE.PORTFOLIO_PERFORMANCE.PESSIMISTIC',
        'UPDATE_STRATEGY_PAGE.PORTFOLIO_PERFORMANCE.DEPOSITED',
        'UPDATE_STRATEGY_PAGE.PORTFOLIO_PERFORMANCE.EXPECTED',
        'UPDATE_STRATEGY_PAGE.PORTFOLIO_PERFORMANCE.OPTIMISTIC',
      ]),
      this.i18nService.selectedLang$,
    ).pipe(
      filter(([, arr, translates, selectedLang]: [void, PerformanceProjection[], any[], LanguagesEnum]) => !!arr.length),
      map(
        ([, data, [pessimistic, deposited, expected, optimistic], selectedLang]: [
          void,
          PerformanceProjection[],
          SelectItem[],
          LanguagesEnum,
        ]) => {
          const seriesOpt: SeriesLineOptions[] = [
            {
              type: 'line',
              name: pessimistic.label,
              data: data.map(item => {
                return [new Date(item.date).getTime(), item.projectedP5];
              }),
              color: new Highcharts.Color(LineColorsEnum.FIRST).get(),
            },
            {
              type: 'line',
              name: deposited.label,
              data: data.map(item => {
                return [new Date(item.date).getTime(), item.deposited];
              }),
              color: new Highcharts.Color(LineColorsEnum.SECOND).get(),
            },
            {
              type: 'line',
              name: expected.label,
              data: data.map(item => {
                return [new Date(item.date).getTime(), item.medianGrowth];
              }),
              color: new Highcharts.Color(LineColorsEnum.THIRD).get(),
            },
            {
              type: 'line',
              name: optimistic.label,
              data: data.map(item => {
                return [new Date(item.date).getTime(), item.projectedP95];
              }),
              color: new Highcharts.Color(LineColorsEnum.FOURTH).get(),
            },
          ];

          const transform = value => {
            return this.currencySignPipe.getTransformValue(value, selectedLang);
          };

          const chartOptions = {
            rangeSelector: {
              enabled: false,
            },
            exporting: {
              enabled: false,
            },
            tooltip: {
              shared: true,
              split: false,
              headerFormat: `<div class="tooltip-title">{point.key}</div>`,
              pointFormatter() {
                return (
                  '<div class="tooltip-list-item">' +
                  '<span class="left">' +
                  `<span class="tooltip-point" style="color:${this.color}">\u25CF</span>` +
                  `<span class="series-name">${this.series.name}:</span>` +
                  '</span>' +
                  `<span class="series-value">${transform(this.y)}</span>` +
                  '</div>'
                );
              },
            },
          };

          return {
            options: chartOptions,
            series: seriesOpt,
          };
        },
      ),
    );
  }

  ngAfterViewInit() {
    // recalculate chart's width after view is initiated (fix of chart's width issue)
    this.rerenderChartEvent$.next();
  }
}
