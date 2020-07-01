export class Customer {
  id: string = null;
  address: {
    buildingNumber: string;
    city: string;
    country: string;
    postalCode: string;
    streetName: string;
  } = null;
  bankAccount: {
    bank: string;
    bic: string;
    holderFirstName: string;
    holderFullName: string;
    holderLastName: string;
    iban: string;
  } = null;
  clearingAccount: {
    bank: string;
    bankCity: string;
    bic: string;
    holderFullName: string;
    iban: string;
  } = null;
  countryOfBirth: string = null;
  currentInvestmentStrategy: string = null;
  currentRecurringDeposit: {
    amount: number;
    schedule: string;
  } = null;
  customerNumber: string = null;
  custodianCustomerId: string = null;
  dateOfBirth: string = null;
  firstName: string = null;
  industry: string = null;
  lastName: string = null;
  nationalities: { country: string }[] = [];
  placeOfBirth: string = null;
  profession: string = null;
  referralCode: string = null;
  referrerCode: string = null;
  status: string = null;
  taxExemptionStatus: {
    category: 'NONE' | 'SINGLE' | 'JOINT' | 'OVERSIZE' | 'FOREIGN';
    leftAmount: number;
    totalAmount: number;
    usedAmount: number;
  } = null;
  taxIdentification: { number: string; country: string }[] = [];
  title: string = null;
  type: string = null;
  unitedStatesTax: boolean = null;

  get holderName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  get germanTin(): string {
    const taxInfo = this.taxIdentification.find(res => res.country === 'DE');
    return taxInfo && taxInfo.number;
  }

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
