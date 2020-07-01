import { NgModule } from '@angular/core';

import { PortfolioPerformanceComponent } from './portfolio-performance.component';
import { AppSharedModule } from '../../../../../../shared/shared.module';

@NgModule({
  declarations: [PortfolioPerformanceComponent],
  imports: [AppSharedModule],
  exports: [PortfolioPerformanceComponent],
})
export class PortfolioPerformanceModule {}
