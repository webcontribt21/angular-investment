import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../../shared/shared.module';

import { MonthlyComponent } from './monthly.component';
import { MonthlyRoutingModule } from './monthly-routing.module';

@NgModule({
  declarations: [MonthlyComponent],
  imports: [AppSharedModule, MonthlyRoutingModule],
})
export class MonthlyModule {}
