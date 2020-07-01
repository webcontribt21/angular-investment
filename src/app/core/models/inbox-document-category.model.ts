import { Translatable } from './common';

export class InboxDocumentCategory {
  code: string = null;
  label: Translatable = null;
  sourceLabel: Translatable = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
