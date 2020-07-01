import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewStrategyComponent } from './new-strategy.component';
import { InvestmentStrategiesResolver } from '../../../../../core/resolvers/investment-strategies.resolver';
import { NewStrategyGuard } from '../../../../../core/guards/new-strategy.guard';
import { SecuritiesResolver } from '../../../../../core/resolvers/securities.resolver';
import { AssetLabelsResolver } from '../../../../../core/resolvers/asset-labels.resolver';
import { AssetClassesResolver } from '../../../../../core/resolvers/asset-classes.resolver';
import { AssetIndustriesResolver } from '../../../../../core/resolvers/asset-industries.resolver';
import { AssetRegionsResolver } from '../../../../../core/resolvers/asset-regions.resolver';

const routes: Routes = [
  {
    path: '',
    component: NewStrategyComponent,
    resolve: {
      investmentStrategies: InvestmentStrategiesResolver,
      securities: SecuritiesResolver,
      assetLabels: AssetLabelsResolver,
      assetClasses: AssetClassesResolver,
      assetIndustries: AssetIndustriesResolver,
      assetRegions: AssetRegionsResolver,
    },
    canActivate: [NewStrategyGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewStrategyRoutingModule {}
