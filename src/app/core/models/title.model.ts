import { Translatable } from './common';

export class Title {
  code: string = null;
  optionId: number = null;
  label: Translatable = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
