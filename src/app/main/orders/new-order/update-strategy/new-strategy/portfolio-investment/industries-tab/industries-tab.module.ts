import { NgModule } from '@angular/core';

import { IndustriesTabComponent } from './industries-tab.component';
import { AppSharedModule } from '../../../../../../../shared/shared.module';

@NgModule({
  declarations: [IndustriesTabComponent],
  imports: [AppSharedModule],
  exports: [IndustriesTabComponent],
})
export class IndustriesTabModule {}
