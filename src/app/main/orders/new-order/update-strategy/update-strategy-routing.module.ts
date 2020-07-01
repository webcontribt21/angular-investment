import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateStrategyComponent } from './update-strategy.component';
import { RiskProfilesResolver } from '../../../../core/resolvers/risk-profiles.resolver';
import { PortfolioResolver } from '../../../../core/resolvers/portfolio.resolver';

const routes: Routes = [
  {
    path: '',
    component: UpdateStrategyComponent,
    children: [
      {
        path: 'interview',
        loadChildren: () => import('./interview/interview.module').then(m => m.InterviewModule),
      },
      {
        path: 'new-strategy',
        loadChildren: () => import('./new-strategy/new-strategy.module').then(m => m.NewStrategyModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/orders/new/update-strategy/interview',
      },
    ],
    resolve: {
      riskProfiles: RiskProfilesResolver,
      portfolio: PortfolioResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateStrategyRoutingModule {}
