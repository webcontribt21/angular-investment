import { NgModule } from '@angular/core';

import { Question3Component } from './question-3.component';
import { AppSharedModule } from '../../../../../../shared/shared.module';

@NgModule({
  declarations: [Question3Component],
  imports: [AppSharedModule],
  exports: [Question3Component],
  entryComponents: [Question3Component],
})
export class Question3Module {}
