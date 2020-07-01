import { NgModule } from '@angular/core';

import { Question1Component } from './question-1.component';
import { AppSharedModule } from '../../../../../../shared/shared.module';

@NgModule({
  declarations: [Question1Component],
  imports: [AppSharedModule],
  exports: [Question1Component],
  entryComponents: [Question1Component],
})
export class Question1Module {}
