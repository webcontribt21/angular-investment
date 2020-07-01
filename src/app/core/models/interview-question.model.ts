import { Translatable } from './common';

export class InterviewQuestion {
  code: string = null;
  type: string = null;
  label: Translatable = null;
  nextQuestion: string = null;
  possibleAnswers: string[] = [];
  description?: Translatable = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
