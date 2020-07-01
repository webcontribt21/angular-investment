import { NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { CurrencySignPipe } from './currency-sign.pipe';

@NgModule({
  declarations: [CurrencySignPipe],
  providers: [CurrencyPipe, CurrencySignPipe],
  exports: [CurrencySignPipe],
})
export class CurrencySignPipeModule {}
