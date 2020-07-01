export const ActionTypes = {
  SELECT_CUSTOMER: `[Customer] Select Customer`,
  CLEAR_SELECTED_CUSTOMER: `[Customer] Clear Selected Customer`,

  LOAD_CUSTOMER: '[Customer] Load Customer',
  LOAD_DEFAULT_CUSTOMER: '[Customer] Load Default Customer',
  LOAD_CUSTOMER_SUCCESS: '[Customer] Load Customer Success',
  LOAD_CUSTOMER_FAIL: '[Customer] Load Customer Fail',

  LOAD_CUSTOMER_DOCUMENTS: '[Customer] Load Customer Documents',
  LOAD_CUSTOMER_DOCUMENTS_SUCCESS: '[Customer] Load Customer Documents Success',
  LOAD_CUSTOMER_DOCUMENTS_FAIL: '[Customer] Load Customer Documents Fail',

  LOAD_CUSTOMER_LATEST_DOCUMENTS: '[Customer] Load Customer Latest Documents',
  LOAD_CUSTOMER_LATEST_DOCUMENTS_SUCCESS: '[Customer] Load Customer Latest Documents Success',
  LOAD_CUSTOMER_LATEST_DOCUMENTS_FAIL: '[Customer] Load Customer Latest Documents Fail',

  SAVE_CUSTOMER: '[Customer] Save Customer',
  SAVE_CUSTOMER_SUCCESS: '[Customer] Save Customer Success',
  SAVE_CUSTOMER_FAIL: '[Customer] Save Customer Fail',
};

interface LoadDefaultCustomerActionPayload {
  customerId: string;
  otherIds: string[];
}

export class SelectCustomerAction {
  static type = ActionTypes.SELECT_CUSTOMER;

  constructor(public payload?: string) {}
}

export class ClearSelectedCustomerAction {
  static type = ActionTypes.CLEAR_SELECTED_CUSTOMER;

  constructor() {}
}
export class LoadDefaultCustomerAction {
  static type = ActionTypes.LOAD_DEFAULT_CUSTOMER;

  constructor(public payload: LoadDefaultCustomerActionPayload) {}
}
export class LoadCustomerAction {
  static type = ActionTypes.LOAD_CUSTOMER;

  constructor(public payload: string) {}
}
export class LoadCustomerSuccessAction {
  static type = ActionTypes.LOAD_CUSTOMER_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadCustomerFailAction {
  static type = ActionTypes.LOAD_CUSTOMER_FAIL;

  constructor(public payload: any) {}
}

export class LoadCustomerDocumentsAction {
  static type = ActionTypes.LOAD_CUSTOMER_DOCUMENTS;

  constructor(public payload: { offset: number; filterKey?: string }) {}
}
export class LoadCustomerDocumentsSuccessAction {
  static type = ActionTypes.LOAD_CUSTOMER_DOCUMENTS_SUCCESS;

  constructor(public payload: { totalCount: number; items: any }) {}
}
export class LoadCustomerDocumentsFailAction {
  static type = ActionTypes.LOAD_CUSTOMER_DOCUMENTS_FAIL;

  constructor(public payload: any) {}
}

export class LoadCustomerLatestDocumentsAction {
  static type = ActionTypes.LOAD_CUSTOMER_LATEST_DOCUMENTS;

  constructor(public payload?: any) {}
}
export class LoadCustomerLatestDocumentsSuccessAction {
  static type = ActionTypes.LOAD_CUSTOMER_LATEST_DOCUMENTS_SUCCESS;

  constructor(public payload: { totalCount: number; items: any }) {}
}
export class LoadCustomerLatestDocumentsFailAction {
  static type = ActionTypes.LOAD_CUSTOMER_LATEST_DOCUMENTS_FAIL;

  constructor(public payload: any) {}
}

export class SaveCustomerAction {
  static type = ActionTypes.SAVE_CUSTOMER;

  constructor(public payload?: any) {}
}
export class SaveCustomerSuccessAction {
  static type = ActionTypes.SAVE_CUSTOMER_SUCCESS;

  constructor(public payload: { totalCount: number; items: any }) {}
}
export class SaveCustomerFailAction {
  static type = ActionTypes.SAVE_CUSTOMER_FAIL;

  constructor(public payload: any) {}
}
