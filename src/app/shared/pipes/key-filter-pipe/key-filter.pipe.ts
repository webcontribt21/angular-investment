import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyfilter',
  pure: false,
})
export class KeyFilterPipe implements PipeTransform {
  transform(items: any[], filter: string[]): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => filter.find(value => value === item.key) === undefined);
  }
}
