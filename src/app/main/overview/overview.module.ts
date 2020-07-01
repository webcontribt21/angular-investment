import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../shared/shared.module';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { TotalStatsModule } from './total-stats/total-stats.module';
import { PortfolioHistoryModule } from './portfolio-history/portfolio-history.module';
import { InvestmentModule } from './investment/investment.module';
import { AccountActivityModule } from './account-activity/account-activity.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [OverviewRoutingModule, AppSharedModule, TotalStatsModule, PortfolioHistoryModule, InvestmentModule, AccountActivityModule],
})
export class OverviewModule {}
