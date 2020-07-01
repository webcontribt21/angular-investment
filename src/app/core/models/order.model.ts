import { OrderStatusEnum } from '../enums/order-status.enum';
import { OrderTypeEnum } from '../enums/order-type.enum';

export class Order {
  id: string = null;
  amount: number = null;
  cancellable: boolean = null;
  oldAmount: number = null;
  createdAt: string = null;
  status: OrderStatusEnum = null;
  orderType: OrderTypeEnum = null;
  scheduleType: string = null;
  updatedAt: string = null;
  expectedOn?: string = null;
  agreementDownloadUrl?: string = null;
  germanTin?: number = null;
  startDate?: string = null;
  endDate?: string = null;
  amountType?: string = null;
  country?: string = null;
  city?: string = null;
  street?: string = null;
  streetNumber?: number = null;
  postalCode?: number = null;
  interviewId?: string = null;
  oldStrategy?: string = null;
  strategy?: string = null;
  spouse?: {
    dateOfBirth: string;
    firstName: string;
    germanTin: number;
    lastName: string;
    title: string;
  } = null;
  bank?: string = null;
  bic?: string = null;
  iban?: string = null;
  templateDownloadUrl?: string = null;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
