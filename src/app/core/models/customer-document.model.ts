export class CustomerDocument {
  link: string = null;
  category: string = null;
  publishDate: string = null;
  relevanceDate: string = null;
  relevanceType: string = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
