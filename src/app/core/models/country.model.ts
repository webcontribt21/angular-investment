import { Translatable } from './common';

export class Country {
  code: string = null;
  taxResidenceUsageAllowed: boolean = null;
  label: Translatable = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
