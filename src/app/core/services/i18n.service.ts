import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';

import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

import { ApplicationGetterState } from '../../ngxs/application';
import { SelectLanguageAction } from '../../ngxs/application/application.actions';

import { LanguagesEnum } from '../enums/i18n.enum';

export interface LanguageOption {
  value: LanguagesEnum;
  label: string;
}

export type LanguageOptions = LanguageOption[];

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  @Select(ApplicationGetterState.getSelectedLang)
  selectedLang$: Observable<LanguagesEnum>;

  defaultLanguage: LanguagesEnum;

  languages$: Observable<LanguageOptions> = of([
    {
      value: LanguagesEnum.en,
      label: 'English',
    },
    {
      value: LanguagesEnum.de,
      label: 'Deutsch',
    },
  ]);

  constructor(private translateService: TranslateService, private store: Store, private cookieService: CookieService) {}

  init() {
    // register locales for angular pipes
    this.registerLocaleData();

    // set default language
    const localeFromCookie: LanguagesEnum = this.cookieService.get('****_locale') as LanguagesEnum;
    this.defaultLanguage = LanguagesEnum[localeFromCookie] ? localeFromCookie : LanguagesEnum.en;
    this.translateService.setDefaultLang(this.defaultLanguage);
    this.selectLang(this.defaultLanguage);
  }

  registerLocaleData() {
    registerLocaleData(localeEn, LanguagesEnum.en);
    registerLocaleData(localeDe, LanguagesEnum.de);
  }

  selectLang(lang: LanguagesEnum) {
    this.store.dispatch(new SelectLanguageAction(lang));
  }

  getTranslationByKeys(keys: string[]): Observable<SelectItem[]> {
    return this.translateService.stream(keys).pipe(map(res => _.map(res, (value, key) => ({ label: res[key], value: key }))));
  }

  getInstantTranslation(key: string): string {
    return this.translateService.instant(key);
  }
}
