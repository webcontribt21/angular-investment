import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../shared/shared.module';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { UserSettingsComponent } from './user-settings.component';
import { UserEmailModule } from './user-email/user-email.module';
import { UserPasswordModule } from './user-password/user-password.module';
import { CommunicationPreferencesModule } from './communication-preferences/communication-preferences.module';

@NgModule({
  declarations: [UserSettingsComponent],
  imports: [AppSharedModule, UserSettingsRoutingModule, UserEmailModule, UserPasswordModule, CommunicationPreferencesModule],
})
export class UserSettingsModule {}
