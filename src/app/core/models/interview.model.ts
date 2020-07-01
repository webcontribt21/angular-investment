import { RiskProfileEnum } from '../enums/risk-profile.enum';

export class Interview {
  id: string = null;
  riskProfile: RiskProfileEnum = null;
  questions?: {
    answer: string;
    question: string;
  }[] = [];

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
