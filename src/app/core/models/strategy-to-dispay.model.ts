export class StrategyToDisplay {
  labelSuffix: string = null;
  description: string = null;
  link: string = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
