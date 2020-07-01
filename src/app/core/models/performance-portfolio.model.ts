import { Allocation } from './allocation.model';

export class PerformancePortfolio {
  absoluteReturn: number;
  allocation: Allocation[] = [];
  balance: number;
  customerId: string;
  date: string;
  liquidity: number;
  netInflow: number;
  rateOfReturn: {
    moneyWeighted: Array<any>;
  };

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
