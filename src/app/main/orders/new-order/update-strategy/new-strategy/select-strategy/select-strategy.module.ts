import { NgModule } from '@angular/core';

import { Ng5SliderModule } from 'ng5-slider';

import { AppSharedModule } from '../../../../../../shared/shared.module';

import { SelectStrategyComponent } from './select-strategy.component';

@NgModule({
  declarations: [SelectStrategyComponent],
  imports: [AppSharedModule, Ng5SliderModule],
  exports: [SelectStrategyComponent],
})
export class SelectStrategyModule {}
