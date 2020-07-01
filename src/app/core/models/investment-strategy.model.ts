import { Allocation } from './allocation.model';
import { Translatable } from './common';

export class InvestmentStrategy {
  allocations: Allocation[] = [];
  code: string = null;
  yearlyReturn: number = null;
  description: Translatable = null;
  label: Translatable = null;
  link: Translatable = null;
  labelSuffix: string = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
