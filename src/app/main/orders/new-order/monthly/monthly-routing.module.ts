import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioResolver } from '../../../../core/resolvers/portfolio.resolver';

import { MonthlyComponent } from './monthly.component';

const routes: Routes = [
  {
    path: '',
    component: MonthlyComponent,
    resolve: {
      portfolio: PortfolioResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyRoutingModule {}
