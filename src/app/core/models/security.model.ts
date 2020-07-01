import { Translatable } from './common';

export class Security {
  assetClass: string = null;
  assetIndustries: {
    [industry: string]: number;
  } = null;
  assetLabel: string = null;
  assetRegions: {
    [region: string]: number;
  } = null;
  code: string = null;
  name: string = null;
  label: Translatable = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
