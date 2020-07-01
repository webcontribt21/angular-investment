export class ActivityFeed {
  category: string = null; // "TAX_OPTIMIZATION_DETECTED"
  channel: string = null; // "ACTIVITY_FEED"
  createdAt: string = null; // "2020-01-21T06:32:32Z"
  id: string = null; // "9"
  message: string = null; // "Within the scope of a tax optimization, 24.51 were credited."

  get isPositive(): boolean {
    return true;
  }

  get isNegative(): boolean {
    return false;
  }

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
