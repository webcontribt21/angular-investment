export class ManagedCustomer {
  customerId: string;
  firstName: string;
  lastName: string;
  relation: string;
}

export class User {
  id: string = null;
  createdAt: string = null;
  email: string = null;
  firstName: string = null;
  lastName: string = null;
  managedCustomers: ManagedCustomer[] = [];
  phoneNumber: string = null;
  preferredLanguage: string = null;
  telephone: string = null;
  titleCode: string = null;

  get fullname(): string {
    return this.firstName + ' ' + this.lastName;
  }

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
