import { RiskProfileEnum } from '../enums/risk-profile.enum';
import { InvestmentStrategyEnum } from '../enums/investment-strategy.enum';
import { Translatable } from './common';

export class RiskProfile {
  code: RiskProfileEnum = null;
  acceptableInvestmentStrategies: InvestmentStrategyEnum[] = [];
  label: Translatable = null;
  description: Translatable = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
