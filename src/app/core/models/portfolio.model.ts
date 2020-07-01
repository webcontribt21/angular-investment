import { Allocation } from './allocation.model';

export class Portfolio {
  currentAllocation: Allocation[] = [];
  currentBalance: number = null;
  currentLiquidity: number = null;
  date: string = null;
  effectiveContribution: number = null;
  recurringDeposit: { amount: number; scheduleType: string } = {
    amount: null,
    scheduleType: '',
  };
  totalProfit: number = null;
  totalReturn: number = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
