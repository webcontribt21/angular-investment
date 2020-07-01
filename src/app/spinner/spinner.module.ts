import { NgModule } from '@angular/core';

import { SpinnerComponent } from './spinner.component';
import { AppSharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [AppSharedModule],
  exports: [SpinnerComponent],
  providers: [],
})
export class SpinnerModule {}
