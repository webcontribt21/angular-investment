export class Pagination {
  totalCount: number = null;
  offset: number = null;
  limit: number = null;
  filter?: string = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
