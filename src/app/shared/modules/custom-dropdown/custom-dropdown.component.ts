import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { I18nService } from '../../../core/services';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
})
export class CustomDropdownComponent implements OnInit {
  @Input() options: SelectItem[];
  @Output() optionSelected: EventEmitter<string> = new EventEmitter();

  translatedOptions$: Observable<SelectItem[]>;

  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    this.translatedOptions$ = this.i18nService.selectedLang$.pipe(
      switchMap(() => {
        const labels: string[] = this.options.map(option => option.label);
        return this.i18nService.getTranslationByKeys(labels);
      }),
      map((res: SelectItem[]) => {
        return res.map((item: SelectItem) => {
          const currentOption: SelectItem = this.options.find((option: SelectItem) => option.label === item.value);
          return {
            ...item,
            value: currentOption && currentOption.value,
          };
        });
      }),
    );
  }

  onSelectType(e) {
    this.optionSelected.emit(e.value);
  }
}
