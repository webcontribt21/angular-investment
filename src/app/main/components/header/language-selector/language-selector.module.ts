import { NgModule } from '@angular/core';

import { LanguageSelectorComponent } from './language-selector.component';
import { AppSharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [LanguageSelectorComponent],
  imports: [AppSharedModule],
  exports: [LanguageSelectorComponent],
  providers: [],
})
export class LanguageSelectorModule {}
