export class Transaction {
  reference: string = null;
  type: string = null;
  category: string = null;
  amount: number = null;
  createdAt: string = null;
  outstanding: boolean = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
