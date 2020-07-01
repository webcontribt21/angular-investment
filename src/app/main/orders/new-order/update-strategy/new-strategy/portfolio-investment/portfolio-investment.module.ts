import { NgModule } from '@angular/core';

import { PortfolioInvestmentComponent } from './portfolio-investment.component';
import { AppSharedModule } from '../../../../../../shared/shared.module';
import { AssetsTabModule } from './assets-tab/assets-tab.module';
import { IndustriesTabModule } from './industries-tab/industries-tab.module';
import { LocationTabModule } from './location-tab/location-tab.module';

@NgModule({
  declarations: [PortfolioInvestmentComponent],
  imports: [AppSharedModule, AssetsTabModule, IndustriesTabModule, LocationTabModule],
  exports: [PortfolioInvestmentComponent],
})
export class PortfolioInvestmentModule {}
