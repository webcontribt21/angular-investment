import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressComponent } from './address.component';
import { CountriesResolver } from '../../../../core/resolvers/countries.resolver';
import { ClearUploadGuard } from '../../../../core/guards/clear-upload.guard';

const routes: Routes = [
  {
    path: '',
    component: AddressComponent,
    resolve: {
      countries: CountriesResolver,
    },
    canDeactivate: [ClearUploadGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressRoutingModule {}
