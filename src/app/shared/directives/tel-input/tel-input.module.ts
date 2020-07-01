import { NgModule } from '@angular/core';

import { TelInputDirective } from './tel-input.directive';

@NgModule({
  declarations: [TelInputDirective],
  providers: [TelInputDirective],
  exports: [TelInputDirective],
})
export class TelInputModule {}
