import { NgModule } from '@angular/core';

import { UpdateStrategyRoutingModule } from './update-strategy-routing.module';
import { UpdateStrategyComponent } from './update-strategy.component';
import { AppSharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [UpdateStrategyComponent],
  imports: [AppSharedModule, UpdateStrategyRoutingModule],
})
export class UpdateStrategyModule {}
