import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../shared/shared.module';

import { PortfolioHistoryComponent } from './portfolio-history.component';
import { StockChartModule } from '../../../shared/modules/stock-chart/stock-chart.module';

@NgModule({
  declarations: [PortfolioHistoryComponent],
  imports: [AppSharedModule, StockChartModule],
  exports: [PortfolioHistoryComponent],
})
export class PortfolioHistoryModule {}
