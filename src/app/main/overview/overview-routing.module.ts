import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecuritiesResolver } from '../../core/resolvers/securities.resolver';
import { AssetClassesResolver } from '../../core/resolvers/asset-classes.resolver';
import { AssetLabelsResolver } from '../../core/resolvers/asset-labels.resolver';
import { InvestmentStrategiesResolver } from '../../core/resolvers/investment-strategies.resolver';
import { PortfolioResolver } from '../../core/resolvers/portfolio.resolver';
import { BalanceHistoryResolver } from '../../core/resolvers/balance-history.resolver';

import { OverviewComponent } from './overview.component';
import { AssetIndustriesResolver } from '../../core/resolvers/asset-industries.resolver';
import { AssetRegionsResolver } from '../../core/resolvers/asset-regions.resolver';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    resolve: {
      securities: SecuritiesResolver,
      assetClasses: AssetClassesResolver,
      assetLabels: AssetLabelsResolver,
      industries: AssetIndustriesResolver,
      regions: AssetRegionsResolver,
      investmentStrategies: InvestmentStrategiesResolver,
      portfolio: PortfolioResolver,
      balanceHistory: BalanceHistoryResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverviewRoutingModule {}
