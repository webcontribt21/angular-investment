import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../shared/shared.module';
import { InvestmentComponent } from './investment.component';
import { ProductsTableModule } from './products-table/products-table.module';
import { IndustriesTableModule } from './industries-table/industries-table.module';
import { RegionsTableModule } from './regions-table/regions-table.module';

@NgModule({
  declarations: [InvestmentComponent],
  imports: [AppSharedModule, ProductsTableModule, IndustriesTableModule, RegionsTableModule],
  exports: [InvestmentComponent],
  providers: [],
})
export class InvestmentModule {}
