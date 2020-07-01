import { Translatable } from './common';

export class InterviewAnswer {
  code: string = null;
  label: Translatable = null;
  description?: Translatable = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
