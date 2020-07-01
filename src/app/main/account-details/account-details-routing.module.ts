import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountDetailsComponent } from './account-details.component';
import { CountriesResolver } from '../../core/resolvers/countries.resolver';

const routes: Routes = [
  {
    path: '',
    component: AccountDetailsComponent,
    resolve: {
      countries: CountriesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountDetailsRoutingModule {}
