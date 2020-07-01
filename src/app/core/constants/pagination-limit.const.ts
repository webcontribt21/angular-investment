import { InjectionToken } from '@angular/core';

export const PAGINATION_LIMIT = new InjectionToken<any>('pagination-limit');

export const PAGINATION_LIMIT_VALUE = {
  transactions: 10,
  documents: 10,
  orders: 10,
  activityFeed: 10,
};
