import { FormControl } from '@angular/forms';

import { dropRepeats } from './dropRepeats';

export class GMValidators {
  static disallowedCharacters(fc: FormControl) {
    const pattern = /[\\"'\^<>#]/g;
    const matched = fc.value ? fc.value.match(pattern) : null;
    const dropped = matched ? dropRepeats<string>(matched).join(', ') : '';
    return dropped ? { disallowedCharacters: true, variable: dropped } : null;
  }

  static german(fc: FormControl) {
    return !fc.value || isGerman(fc.value) ? null : { invalidGerman: true };
  }
}

const GERMAN_PATTERN = /^[a-zA-ZäöüßÄÖÜẞ0-9 .'-_=+,:;\\/\\\\]+$/;
export function isGerman(text: string) {
  // same regex as api
  return GERMAN_PATTERN.test(text);
}
