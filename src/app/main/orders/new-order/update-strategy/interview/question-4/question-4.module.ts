import { NgModule } from '@angular/core';

import { Question4Component } from './question-4.component';
import { AppSharedModule } from '../../../../../../shared/shared.module';

@NgModule({
  declarations: [Question4Component],
  imports: [AppSharedModule],
  exports: [Question4Component],
  entryComponents: [Question4Component],
})
export class Question4Module {}
