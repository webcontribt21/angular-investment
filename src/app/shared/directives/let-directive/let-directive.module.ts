import { NgModule } from '@angular/core';

import { NgLetDirective } from './let.directive';

@NgModule({
  declarations: [NgLetDirective],
  providers: [NgLetDirective],
  exports: [NgLetDirective],
})
export class LetDirectiveModule {}
