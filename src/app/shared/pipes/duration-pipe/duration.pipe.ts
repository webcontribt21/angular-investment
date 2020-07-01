import { Pipe, PipeTransform } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { I18nService } from '../../../core/services';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  transform(date: string): Observable<string> {
    return this.i18nService.selectedLang$.pipe(
      map(() =>
        moment(date)
          .startOf('minute')
          .fromNow(),
      ),
    );
  }
}
