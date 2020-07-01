import { Pipe, PipeTransform } from '@angular/core';

import { combineLatest, isObservable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { I18nService } from '../../../core/services';
import { LanguagesEnum } from '../../../core/enums/i18n.enum';
import { TranslatableObject } from './translatable-object.interface';
import { isTranslatable } from 'src/app/core/models';

@Pipe({
  name: 'customTranslate',
})
export class CustomTranslatePipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  transform(obj: TranslatableObject | Observable<TranslatableObject>): Observable<string> {
    if (isObservable(obj)) {
      return combineLatest(this.i18nService.selectedLang$, obj).pipe(
        map(([selectedLang, data]: [string, TranslatableObject]) => {
          return translate(data, selectedLang);
        }),
      );
    }
    return this.i18nService.selectedLang$.pipe(map((selectedLang: LanguagesEnum) => translate(obj, selectedLang)));
  }
}

function translate(data: TranslatableObject, lang: LanguagesEnum | string) {
  return isTranslatable(data) ? data[lang] : isTranslatable(data.label) ? data.label[lang] : '';
}
