export class TransactionsSummary {
  count: number = null;
  sumAmount: number = null;
  transactionCategory: string = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
