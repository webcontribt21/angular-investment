import { NgModule } from '@angular/core';

import { InsufficientExperienceComponent } from './insufficient-experience.component';
import { AppSharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [InsufficientExperienceComponent],
  imports: [AppSharedModule],
  entryComponents: [InsufficientExperienceComponent],
  exports: [InsufficientExperienceComponent],
})
export class InsufficientExperienceModule {}
