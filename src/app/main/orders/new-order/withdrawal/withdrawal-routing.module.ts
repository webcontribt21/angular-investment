import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioResolver } from '../../../../core/resolvers/portfolio.resolver';
import { InvestmentStrategiesResolver } from '../../../../core/resolvers/investment-strategies.resolver';

import { WithdrawalComponent } from './withdrawal.component';

const routes: Routes = [
  {
    path: '',
    component: WithdrawalComponent,
    resolve: {
      portfolio: PortfolioResolver,
      investmentStrategies: InvestmentStrategiesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawalRoutingModule {}
