import { NgModule } from '@angular/core';

import { Question6Component } from './question-6.component';
import { AppSharedModule } from '../../../../../../shared/shared.module';

@NgModule({
  declarations: [Question6Component],
  imports: [AppSharedModule],
  exports: [Question6Component],
  entryComponents: [Question6Component],
})
export class Question6Module {}
