import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';

import { ProductsDetailedTableModalComponent } from './products-detailed-table-modal.component';

@NgModule({
  declarations: [ProductsDetailedTableModalComponent],
  imports: [CommonModule, TableModule, TranslateModule],
  exports: [ProductsDetailedTableModalComponent],
  entryComponents: [ProductsDetailedTableModalComponent],
})
export class ProductsDetailedTableModalModule {}
