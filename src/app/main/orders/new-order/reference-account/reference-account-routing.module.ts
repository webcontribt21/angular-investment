import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferenceAccountComponent } from './reference-account.component';

const routes: Routes = [
  {
    path: '',
    component: ReferenceAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferenceAccountRoutingModule {}
