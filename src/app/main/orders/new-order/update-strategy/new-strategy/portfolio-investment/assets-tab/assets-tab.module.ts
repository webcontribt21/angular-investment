import { NgModule } from '@angular/core';

import { AssetsTabComponent } from './assets-tab.component';
import { AppSharedModule } from '../../../../../../../shared/shared.module';

@NgModule({
  declarations: [AssetsTabComponent],
  imports: [AppSharedModule],
  exports: [AssetsTabComponent],
})
export class AssetsTabModule {}
