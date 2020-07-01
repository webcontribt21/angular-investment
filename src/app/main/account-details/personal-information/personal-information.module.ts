import { NgModule } from '@angular/core';

import { PersonalInformationComponent } from './personal-information.component';
import { AppSharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [PersonalInformationComponent],
  imports: [AppSharedModule],
  exports: [PersonalInformationComponent],
  providers: [],
})
export class PersonalInformationModule {}
