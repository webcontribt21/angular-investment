import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { AppSharedModule } from '../../../shared/shared.module';
import { UserMenuModule } from './user-menu/user-menu.module';
import { LanguageSelectorModule } from './language-selector/language-selector.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [AppSharedModule, UserMenuModule, LanguageSelectorModule],
  exports: [HeaderComponent],
  providers: [],
})
export class HeaderModule {}
