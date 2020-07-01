import { NgModule } from '@angular/core';

import { IndustriesTableComponent } from './industries-table.component';
import { AppSharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [IndustriesTableComponent],
  imports: [AppSharedModule],
  exports: [IndustriesTableComponent],
})
export class IndustriesTableModule {}
