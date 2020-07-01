import { Component, OnDestroy, OnInit } from '@angular/core';

import { SelectItem } from 'primeng/api';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, switchMapTo, take } from 'rxjs/operators';
import { SeriesAreaOptions, SeriesLineOptions, SeriesOptions } from 'highcharts';
import * as Highcharts from 'highcharts';

import { ApeironService, I18nService } from '../../../core/services';
import { ApeironHistory } from '../../../core/models';
import { CurrencySignPipe } from '../../../shared/pipes/currency-sign-pipe/currency-sign.pipe';
import { LanguagesEnum } from '../../../core/enums/i18n.enum';
import { DatePipe } from '@angular/common';
import { HistorySelection } from '../../../core/models/history-selection.model';

@Component({
  selector: 'app-portfolio-history',
  templateUrl: './portfolio-history.component.html',
  styleUrls: ['./portfolio-history.component.scss'],
})
export class PortfolioHistoryComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  keysToTranslate: {
    balance: string;
    perfomance: string;
  } = {
    balance: 'OVERVIEW_PAGE.PORTFOLIO_HISTORY.BALANCE',
    perfomance: 'OVERVIEW_PAGE.PORTFOLIO_HISTORY.PERFORMANCE',
  };

  selectedHistory$: Observable<HistorySelection>;
  balanceHistory$: Observable<ApeironHistory[]>;
  performanceHistory$: Observable<ApeironHistory[]>;
  chartBalanceValues$: Observable<{ options: Highcharts.Options; series: SeriesOptions[] }>;
  chartPerformanceValues$: Observable<{ options: Highcharts.Options; series: SeriesOptions[] }>;
  selectedBalancePeriod$: Observable<string>;
  selectedPerformancePeriod$: Observable<string>;

  constructor(
    private i18nService: I18nService,
    private apeironService: ApeironService,
    private currencySignPipe: CurrencySignPipe,
    private datePipe: DatePipe,
  ) {
    this.selectedHistory$ = this.apeironService.selectedHistory$;
    this.selectedBalancePeriod$ = this.apeironService.selectedBalancePeriod$;
    this.selectedPerformancePeriod$ = this.apeironService.selectedPerformancePeriod$;
  }

  ngOnInit() {
    this.balanceHistory$ = this.apeironService.balanceHistory$;
    this.performanceHistory$ = this.apeironService.performanceHistory$;

    this.chartBalanceValues$ = combineLatest([
      this.balanceHistory$,
      this.i18nService.getTranslationByKeys([this.keysToTranslate.balance]),
      this.i18nService.selectedLang$,
      this.selectedHistory$,
    ]).pipe(
      map(([data, [clickedBtn], selectedLang]: [ApeironHistory[], SelectItem[], LanguagesEnum, HistorySelection]) => {
        const seriesOpt: SeriesLineOptions | SeriesAreaOptions = {
          type: 'area',
          name: 'Balance',
          data: data.map(item => [new Date(item.date).getTime(), item.value]),
          color: '#0083BB',
          fillColor: 'rgba(179, 218, 235, 0.4)',
          lineWidth: 1,
          threshold: null,
          softThreshold: true,
        };

        const chartOptions = this.getChartOptions(clickedBtn, selectedLang);

        return {
          options: chartOptions,
          series: [seriesOpt],
        };
      }),
    );

    this.chartPerformanceValues$ = combineLatest([
      this.performanceHistory$,
      this.i18nService.getTranslationByKeys([this.keysToTranslate.perfomance]),
      this.i18nService.selectedLang$,
      this.selectedHistory$,
    ]).pipe(
      map(([data, [clickedBtn], selectedLang]: [ApeironHistory[], SelectItem[], LanguagesEnum, HistorySelection]) => {
        const seriesOpt: SeriesLineOptions | SeriesAreaOptions = {
          type: 'line',
          name: 'Performance',
          data: data.map(item => [new Date(item.date).getTime(), item.value]),
          color: '#0083BB',
          lineWidth: 1,
        };

        const chartOptions = this.getChartOptions(clickedBtn, selectedLang);

        return {
          options: chartOptions,
          series: [seriesOpt],
        };
      }),
    );

    this.subscriptions.push(
      this.apeironService.selectedHistory$
        .pipe(
          filter((selected: HistorySelection) => selected.tab === 1),
          switchMapTo(
            this.apeironService.performanceHistoryGetRequestState$.pipe(
              // allow loading only if not loaded
              filter(res => !res.loaded),
            ),
          ),
          take(1),
        )
        .subscribe(() => this.apeironService.loadPerformanceHistory()),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  switchHistory(e) {
    // const selectedTab = e.index === 0 ? this.keysToTranslate.balance : this.keysToTranslate.perfomance;
    this.apeironService.selectHistoryTab(e.index);
  }

  getChartOptions(clickedBtn: SelectItem, selectedLang: LanguagesEnum) {
    const transformValue = value => {
      return this.currencySignPipe.getTransformValue(value, selectedLang);
    };

    const transformDate = value => {
      return this.datePipe.transform(value, 'EE, MMMM d, y', undefined, selectedLang);
    };

    return {
      tooltip: {
        formatter() {
          return `<div class="balance-tooltip">
                    <div class="tooltip-title">${clickedBtn.label}</div>
                    <div class="tooltip-value">${transformValue(this.y)}</div>
                    <div class="tooltip-date">${transformDate(this.x)}</div>
                  </div>`;
        },
      },
    };
  }

  balancePeriodChanged(value) {
    this.apeironService.setBalancePeriod(value);
  }

  performancePeriodChanged(value) {
    this.apeironService.setPerformancePeriod(value);
  }
}
