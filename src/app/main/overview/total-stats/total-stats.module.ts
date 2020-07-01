import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../shared/shared.module';

import { TotalStatsComponent } from './total-stats.component';
import { PercentPipe } from '@angular/common';

@NgModule({
  declarations: [TotalStatsComponent],
  imports: [AppSharedModule],
  exports: [TotalStatsComponent],
  providers: [PercentPipe],
})
export class TotalStatsModule {}
