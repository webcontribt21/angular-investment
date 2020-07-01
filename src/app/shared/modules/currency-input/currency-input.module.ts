import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxCurrencyModule } from 'ngx-currency';

import { CurrencyInputComponent } from './currency-input.component';

@NgModule({
  declarations: [CurrencyInputComponent],
  imports: [CommonModule, ReactiveFormsModule, NgxCurrencyModule],
  exports: [CurrencyInputComponent],
})
export class CurrencyInputModule {}
