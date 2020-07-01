import { OrderTypeEnum } from '../enums/order-type.enum';

export interface ConstraintsItem {
  canBeCreated: boolean;
}

export class OrderConstraints {
  [OrderTypeEnum.addressChange]: ConstraintsItem = null;
  [OrderTypeEnum.fullWithdrawal]: ConstraintsItem = null;
  [OrderTypeEnum.kwgMigration]: ConstraintsItem = null;
  [OrderTypeEnum.deposit]: ConstraintsItem = null;
  [OrderTypeEnum.recurringDepositChange]: ConstraintsItem = null;
  [OrderTypeEnum.strategyChange]: ConstraintsItem = null;
  [OrderTypeEnum.taxExemption]: ConstraintsItem = null;
  [OrderTypeEnum.withdrawal]: ConstraintsItem = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
