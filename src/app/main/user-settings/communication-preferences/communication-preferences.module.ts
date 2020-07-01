import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../shared/shared.module';

import { CommunicationPreferencesComponent } from './communication-preferences.component';

@NgModule({
  declarations: [CommunicationPreferencesComponent],
  imports: [AppSharedModule],
  exports: [CommunicationPreferencesComponent],
})
export class CommunicationPreferencesModule {}
