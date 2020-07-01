import { Order } from '../../core/models';

export const ActionTypes = {
  LOAD_ORDERS: '[Order] Load Orders',
  LOAD_ORDERS_SUCCESS: '[Order] Load Orders Success',
  LOAD_ORDERS_FAIL: '[Order] Load Orders Fail',

  CREATE_ORDER: '[Order] Create Order',
  CREATE_ORDER_SUCCESS: '[Order] Create Order Success',
  CREATE_ORDER_FAIL: '[Order] Create Order Fail',

  PATCH_ORDER: '[Order] Patch Order',
  PATCH_ORDER_SUCCESS: '[Order] Patch Order Success',
  PATCH_ORDER_FAIL: '[Order] Patch Order Fail',

  NEXT_INTERVIEW_STEP: '[Order] Next Interview Step',
  PREV_INTERVIEW_STEP: '[Order] Prev Interview Step',

  CLEAR_REFERENCE_ACCOUNT_FORM: '[Order] Clear Reference Account Form',
  CLEAR_NEW_ADDRESS_FORM: '[Order] Clear New Address Form',
  CLEAR_TAX_EXEMPTION_FORM: '[Order] Clear Tax Exemption Form',

  LOAD_ORDER_CONSTRAINTS: '[Order] Load Order Constraints',
  LOAD_ORDER_CONSTRAINTS_SUCCESS: '[Order] Load Order Constraints Success',
  LOAD_ORDER_CONSTRAINTS_FAIL: '[Order] Load Order Constraints Fail',
};

export class LoadOrdersAction {
  static type = ActionTypes.LOAD_ORDERS;

  constructor(public payload?: any) {}
}
export class LoadOrdersSuccessAction {
  static type = ActionTypes.LOAD_ORDERS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadOrdersFailAction {
  static type = ActionTypes.LOAD_ORDERS_FAIL;

  constructor(public payload: any) {}
}

export class CreateOrderAction {
  static type = ActionTypes.CREATE_ORDER;

  constructor(public payload?: any) {}
}
export class CreateOrderSuccessAction {
  static type = ActionTypes.CREATE_ORDER_SUCCESS;

  constructor(public payload: any) {}
}
export class CreateOrderFailAction {
  static type = ActionTypes.CREATE_ORDER_FAIL;

  constructor(public payload: any) {}
}

export class PatchOrderAction {
  static type = ActionTypes.PATCH_ORDER;

  constructor(public payload?: any) {}
}
export class PatchOrderSuccessAction {
  static type = ActionTypes.PATCH_ORDER_SUCCESS;

  constructor(public payload: Order) {}
}
export class PatchOrderFailAction {
  static type = ActionTypes.PATCH_ORDER_FAIL;

  constructor(public payload: any) {}
}

export class ClearReferenceAccountFormAction {
  static type = ActionTypes.CLEAR_REFERENCE_ACCOUNT_FORM;

  constructor(public payload?: any) {}
}
export class ClearNewAddressFormAction {
  static type = ActionTypes.CLEAR_NEW_ADDRESS_FORM;

  constructor(public payload?: any) {}
}
export class ClearTaxExemptionFormAction {
  static type = ActionTypes.CLEAR_TAX_EXEMPTION_FORM;

  constructor(public payload?: any) {}
}

export class LoadOrderConstraintsAction {
  static type = ActionTypes.LOAD_ORDER_CONSTRAINTS;

  constructor(public payload?: any) {}
}
export class LoadOrderConstraintsSuccessAction {
  static type = ActionTypes.LOAD_ORDER_CONSTRAINTS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadOrderConstraintsFailAction {
  static type = ActionTypes.LOAD_ORDER_CONSTRAINTS_FAIL;

  constructor(public payload: any) {}
}
