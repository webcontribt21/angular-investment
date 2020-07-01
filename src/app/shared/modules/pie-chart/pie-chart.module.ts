import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'angular-highcharts';

import { PieChartComponent } from './pie-chart.component';

@NgModule({
  declarations: [PieChartComponent],
  imports: [CommonModule, ChartModule],
  exports: [PieChartComponent],
})
export class PieChartModule {}
