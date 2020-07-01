import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViolationsResolver } from '../../core/resolvers/violations.resolver';
import { UserSettingsComponent } from './user-settings.component';

const routes: Routes = [
  {
    path: '',
    component: UserSettingsComponent,
    resolve: {
      violations: ViolationsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSettingsRoutingModule {}
