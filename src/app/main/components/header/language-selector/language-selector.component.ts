import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { I18nService } from '../../../../core/services';
import { LanguagesEnum } from '../../../../core/enums/i18n.enum';
import { LanguageOptions } from 'src/app/core/services/i18n.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  selectedLang$: Observable<LanguagesEnum> = this.i18nService.selectedLang$;

  languages$: Observable<LanguageOptions> = this.i18nService.languages$;

  constructor(private i18nService: I18nService) {}

  selectLanguage(e) {
    this.i18nService.selectLang(e.value);
  }
}
