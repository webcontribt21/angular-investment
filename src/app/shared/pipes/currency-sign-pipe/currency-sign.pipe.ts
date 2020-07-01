import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { I18nService } from '../../../core/services';
import { LanguagesEnum } from '../../../core/enums/i18n.enum';

@Pipe({
  name: 'currencySignPipe',
})
export class CurrencySignPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe, private i18nService: I18nService) {}

  transform(value: number, decimals = 2): Observable<string> {
    return this.i18nService.selectedLang$.pipe(
      map((selectedLang: LanguagesEnum) => {
        return this.getTransformValue(value, selectedLang, decimals);
      }),
    );
  }

  getTransformValue(value: number, selectedLang: LanguagesEnum, decimals = 2) {
    return this.currencyPipe.transform(value, 'EUR', 'symbol', `1.${decimals}-2`, selectedLang);
  }
}
