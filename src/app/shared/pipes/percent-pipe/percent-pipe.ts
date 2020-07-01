import { PercentPipe as AngularPercentPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../../../core/services/i18n.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'percentPipe',
  pure: false,
})
export class PercentPipe implements PipeTransform {
  constructor(private percentPipe: AngularPercentPipe, private i18nService: I18nService) {}

  transform(value: number, args?: any): Observable<string> {
    return this.i18nService.selectedLang$.pipe(
      map(() => {
        return this.getTransformValue(value, args);
      }),
    );
  }

  getTransformValue(value: number, args?: any) {
    return this.percentPipe.transform(value, args);
  }
}
