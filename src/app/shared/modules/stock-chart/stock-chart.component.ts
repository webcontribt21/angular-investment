import { Component, Input, OnChanges, OnDestroy, OnInit, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';

import { StockChart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { SelectItem } from 'primeng/api';
import { filter, map, tap } from 'rxjs/operators';
import { combineLatest, Observable, ReplaySubject, Subscription } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';

import * as noDataModule from 'highcharts/modules/no-data-to-display';
noDataModule(Highcharts);

import { I18nService, ApeironService } from '../../../core/services';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
})
export class StockChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  options: Highcharts.Options;
  @Input()
  data: {
    name: string;
    type: string;
    data: any[];
    color: string;
  }[];
  @Input()
  showLegend: boolean;
  @Input()
  selectedPeriod: string;
  @Output()
  selectedPeriodChange = new EventEmitter();

  subscriptions: Subscription[] = [];
  chart$: Observable<StockChart>;
  buildChartEvent$: ReplaySubject<any> = new ReplaySubject(1);

  legendData: { title: string; color: string }[];
  defaultOptions: Highcharts.Options = {
    chart: {
      height: 340,
    },
    yAxis: {
      labels: {
        formatter() {
          return this.value.toString();
        },
        style: {
          color: '#8992A1',
        },
      },
    },
    xAxis: {
      minRange: 1,
      labels: {
        style: {
          color: '#8992A1',
        },
      },
    },

    rangeSelector: {
      inputEnabled: true,
      allButtonsEnabled: true,

      inputDateFormat: '%b %e, %Y',
      inputEditDateFormat: '%Y-%m-%d',
      inputDateParser: value => {
        value = value.split(/[\-]/);
        return Date.UTC(parseInt(value[0], 10), parseInt(value[1], 10) - 1, parseInt(value[2], 10));
      },

      buttonTheme: {
        width: 70,
        height: 15,
      },
    },
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: true,
      fallbackToExportServer: false,
      buttons: {
        contextButton: {
          menuItems: ['downloadCSV'],
        },
      },
    },
    tooltip: {
      useHTML: true,
      borderWidth: 0,
      borderRadius: 2,
      backgroundColor: '#FFFFFF',
      style: {
        opacity: 1,
      },
    },
  };

  constructor(private i18nService: I18nService, private elRef: ElementRef, private apeironService: ApeironService, private zone: NgZone) {}

  ngOnInit() {
    this.subscriptions.push(
      this.i18nService
        .getTranslationByKeys([
          'COMMON.MONTH_NAMES',
          'COMMON.SHORT_MONTH_NAMES',
          'COMMON.DOWNLOAD.CSV',
          'COMMON.DOWNLOAD.JPEG',
          'COMMON.DOWNLOAD.PDF',
          'COMMON.DOWNLOAD.PNG',
          'COMMON.DOWNLOAD.SVG',
          'COMMON.DOWNLOAD.XLS',
          'COMMON.RANGE_FROM',
          'COMMON.RANGE_TO',
          'COMMON.NO_DATA',
        ])
        .subscribe(([monthNames, monthShortNames, csv, jpeg, pdf, png, svg, xls, rangeSelectorFrom, rangeSelectorTo, noData]) => {
          Highcharts.setOptions({
            lang: {
              months: monthNames.label.split(', '),
              shortMonths: monthShortNames.label.split(', '),
              downloadCSV: csv.label,
              downloadJPEG: jpeg.label,
              downloadPDF: pdf.label,
              downloadPNG: png.label,
              downloadSVG: svg.label,
              downloadXLS: xls.label,
              rangeSelectorFrom: rangeSelectorFrom.label,
              rangeSelectorTo: rangeSelectorTo.label,
              noData: noData.label,
            },
          });
        }),
    );

    this.chart$ = combineLatest([
      this.buildChartEvent$,
      this.i18nService.getTranslationByKeys(['COMMON.WEEKS.1', 'COMMON.MONTHS.1', 'COMMON.YTD', 'COMMON.YEARS.1', 'COMMON.ALL']),
    ]).pipe(
      filter(() => !!this.data && !!this.options),
      map(([event, [week, month, ytd, year1, all]]: [any[], SelectItem[]]) => {
        // Build Legend
        if (this.showLegend) {
          this.legendData = this.data.map(series => {
            return {
              title: series.name,
              color: series.color,
            };
          });
        }

        const buttonConfig = this.getRangeSelectorButtons([week, month, ytd, year1, all]);

        // Build Chart
        const noData = this.data[0].data.find(x => x !== 0) === undefined;
        return new StockChart({
          ...this.defaultOptions,
          ...this.options,
          responsive: {
            rules: buttonConfig.responsiveRules,
          },
          series: noData ? null : this.data,
          rangeSelector: {
            ...(this.defaultOptions.rangeSelector || {}),
            buttons: buttonConfig.buttonsAll,
            selected: 1,
            ...(this.options.rangeSelector || {}),
          },
          tooltip: {
            ...this.defaultOptions.tooltip,
            ...(this.options.tooltip || {}),
          },
        });
      }),
      tap(chart => {
        setTimeout(() => {
          this.elRef.nativeElement.querySelectorAll('input').forEach(input => {
            input.type = 'date';
          });
        }, 0);
      }),
    );
  }

  hasData() {
    return this.data[0].data.find(x => x !== 0) !== undefined;
  }

  getRangeSelectorButtons([week, month, ytd, year1, all]: SelectItem[]) {
    const buttons: any[] = [];
    let isWeekDisplayed = false;
    let isMonthDisplayed = false;
    let isYearDisplayed = false;
    this.data.forEach(res => {
      const daysDiff = moment(_.first(_.last(res.data))).diff(_.first(_.first(res.data)), 'days');
      const daysInTheYear = moment().diff(moment().subtract(1, 'years'), 'days');
      const daysInTheMonth = moment().diff(moment().subtract(1, 'month'), 'days');
      if (daysDiff > 7) {
        isWeekDisplayed = true;
      }
      if (daysDiff > daysInTheMonth) {
        isMonthDisplayed = true;
      }
      if (daysDiff > daysInTheYear) {
        isYearDisplayed = true;
      }
    });

    const that = this;

    if (isWeekDisplayed) {
      buttons.push({
        type: 'week',
        count: 1,
        text: `${week.label}`,
        events: {
          click() {
            setTimeout(() => {
              that.setSelectedPeriod(this.type);
            }, 0);
          },
        },
      });
    }
    if (isMonthDisplayed) {
      buttons.push({
        type: 'month',
        count: 1,
        text: `${month.label}`,
        events: {
          click() {
            setTimeout(() => {
              that.setSelectedPeriod(this.type);
            }, 0);
          },
        },
      });
    }
    if (isYearDisplayed) {
      buttons.push({
        type: 'year',
        count: 1,
        text: `${year1.label}`,
        events: {
          click() {
            setTimeout(() => {
              that.setSelectedPeriod(this.type);
            }, 0);
          },
        },
      });
    }

    buttons.push({
      type: 'ytd',
      text: `${ytd.label}`,
      events: {
        click() {
          setTimeout(() => {
            that.setSelectedPeriod(this.type);
          }, 0);
        },
      },
    });

    buttons.push({
      type: 'all',
      text: `${all.label}`,
      events: {
        click() {
          setTimeout(() => {
            that.setSelectedPeriod(this.type);
          }, 0);
        },
      },
    });

    const responsiveRules = [
      {
        condition: {
          maxWidth: 480,
        },
        chartOptions: {
          rangeSelector: {
            // select last 3 available buttons
            buttons: buttons.slice(Math.max(0, buttons.length - 3)),
            selected: this.getSelectedPeriodIndex(buttons.slice(Math.max(0, buttons.length - 3))),
          },
        },
      },
      {
        condition: {
          minWidth: 481,
        },
        chartOptions: {
          rangeSelector: {
            buttons,
            selected: this.getSelectedPeriodIndex(buttons),
          },
        },
      },
    ];
    return {
      responsiveRules,
      buttonsAll: buttons,
    };
  }

  ngOnChanges() {
    this.buildChartEvent$.next();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  setSelectedPeriod(type) {
    this.selectedPeriodChange.emit(type);
  }

  getSelectedPeriodIndex(buttons) {
    let buttonIndex = 1;
    buttons.forEach((button, index) => {
      if (button.type === this.selectedPeriod) {
        buttonIndex = index;
      }
    });
    return buttonIndex;
  }
}
