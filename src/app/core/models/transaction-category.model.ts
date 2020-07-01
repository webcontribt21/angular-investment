import { Translatable } from './common';

export class TransactionCategory {
  public code: string = null;
  label: Translatable = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
