import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxExemptionComponent } from './tax-exemption.component';
import { ClearUploadGuard } from '../../../../core/guards/clear-upload.guard';
import { TitlesResolver } from '../../../../core/resolvers/titles.resolver';

const routes: Routes = [
  {
    path: '',
    component: TaxExemptionComponent,
    resolve: {
      titles: TitlesResolver,
    },
    canDeactivate: [ClearUploadGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxExemptionRoutingModule {}
