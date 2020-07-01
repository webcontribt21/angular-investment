import { NgModule } from '@angular/core';

import { FooterComponent } from './footer.component';
import { AppSharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [AppSharedModule],
  exports: [FooterComponent],
  providers: [],
})
export class FooterModule {}
