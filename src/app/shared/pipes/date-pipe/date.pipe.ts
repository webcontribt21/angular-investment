import { DatePipe as AngularDatePipe } from '@angular/common';
import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

class Query {
  static of(value: any, format?: string, timezone?: string) {
    return JSON.stringify(value) + format + timezone;
  }
}

@Pipe({
  name: 'gmDate',
  pure: false,
})
export class DatePipe extends AngularDatePipe implements PipeTransform, OnDestroy {
  private sub: Subscription;
  private gmLocale: string;
  private gmCache: Map<string, string> = new Map();
  constructor(private translateService: TranslateService) {
    super(translateService.currentLang);

    this.sub = this.translateService.onLangChange.subscribe((lang: LangChangeEvent) => {
      this.gmLocale = lang.lang;
      this.gmCache.clear();
    });
  }

  transform(value: any, format?: string, timezone?: string): string {
    const query = Query.of(value, format, timezone);
    if (!this.gmCache.has(query)) {
      this.gmCache.set(query, super.transform(value, format, timezone, this.gmLocale));
    }
    return this.gmCache.get(query);
  }

  ngOnDestroy(): void {
    if (this.sub && !this.sub.closed) {
      this.sub.unsubscribe();
      this.sub = undefined;
    }
  }
}
