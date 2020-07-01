import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'angular-highcharts';

import { StockChartComponent } from './stock-chart.component';

@NgModule({
  declarations: [StockChartComponent],
  imports: [CommonModule, ChartModule],
  exports: [StockChartComponent],
})
export class StockChartModule {}
