import { NgModule } from '@angular/core';

import { CustomTranslatePipe } from './custom-translate.pipe';

@NgModule({
  declarations: [CustomTranslatePipe],
  exports: [CustomTranslatePipe],
})
export class CustomTranslatePipeModule {}
