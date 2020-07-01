import { NgModule } from '@angular/core';

import { RegionsTableComponent } from './regions-table.component';
import { AppSharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [RegionsTableComponent],
  imports: [AppSharedModule],
  exports: [RegionsTableComponent],
})
export class RegionsTableModule {}
