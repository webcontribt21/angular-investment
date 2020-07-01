import { NgModule } from '@angular/core';

import { NewStrategyRoutingModule } from './new-strategy-routing.module';
import { NewStrategyComponent } from './new-strategy.component';
import { AppSharedModule } from '../../../../../shared/shared.module';
import { OrderSummaryModule } from '../order-summary/order-summary.module';
import { SelectStrategyModule } from './select-strategy/select-strategy.module';
import { PortfolioInvestmentModule } from './portfolio-investment/portfolio-investment.module';
import { PortfolioPerformanceModule } from './portfolio-performance/portfolio-performance.module';

@NgModule({
  declarations: [NewStrategyComponent],
  imports: [
    AppSharedModule,
    NewStrategyRoutingModule,
    OrderSummaryModule,
    SelectStrategyModule,
    PortfolioInvestmentModule,
    PortfolioPerformanceModule,
  ],
})
export class NewStrategyModule {}
