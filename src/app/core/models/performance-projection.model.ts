export class PerformanceProjection {
  date: string = null;
  deposited: number = null;
  medianGrowth: number = null;
  projectedP5: number = null;
  projectedP20: number = null;
  projectedP50: number = null;
  projectedP80: number = null;
  projectedP95: number = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
