export class Allocation {
  amount: number = null;
  ratio: number = null;
  isin?: string = null;
  security: string = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
