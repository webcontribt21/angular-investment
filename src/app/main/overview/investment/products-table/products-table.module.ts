import { NgModule } from '@angular/core';

import { ProductsTableComponent } from './products-table.component';
import { AppSharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [ProductsTableComponent],
  imports: [AppSharedModule],
  exports: [ProductsTableComponent],
})
export class ProductsTableModule {}
