import { NgModule } from '@angular/core';

import { Question2Component } from './question-2.component';
import { AppSharedModule } from '../../../../../../shared/shared.module';

@NgModule({
  declarations: [Question2Component],
  imports: [AppSharedModule],
  exports: [Question2Component],
  entryComponents: [Question2Component],
})
export class Question2Module {}
