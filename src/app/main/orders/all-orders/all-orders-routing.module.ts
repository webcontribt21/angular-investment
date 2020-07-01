import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersResolver } from '../../../core/resolvers/orders.resolver';
import { AllOrdersComponent } from './all-orders.component';
import { InvestmentStrategiesResolver } from '../../../core/resolvers/investment-strategies.resolver';
import { PortfolioResolver } from '../../../core/resolvers/portfolio.resolver';
import { CountriesResolver } from '../../../core/resolvers/countries.resolver';

const routes: Routes = [
  {
    path: '',
    component: AllOrdersComponent,
    resolve: {
      orders: OrdersResolver,
      investmentStrategies: InvestmentStrategiesResolver,
      portfolio: PortfolioResolver,
      countries: CountriesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllOrdersRoutingModule {}
