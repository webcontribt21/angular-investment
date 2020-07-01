import { NgModule } from '@angular/core';

import { Question5Component } from './question-5.component';
import { AppSharedModule } from '../../../../../../shared/shared.module';

@NgModule({
  declarations: [Question5Component],
  imports: [AppSharedModule],
  exports: [Question5Component],
  entryComponents: [Question5Component],
})
export class Question5Module {}
