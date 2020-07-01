const ActionNames = {
  REQ_GET_TRANSACTIONS: '[Request] Get Transactions',
  REQ_GET_TRANSACTIONS_SUCCESS: '[Request] Get Transactions Success',
  REQ_GET_TRANSACTIONS_FAILED: '[Request] Get Transactions Failed',
};

export class TransactionsGetRequestAction {
  static type: string = ActionNames.REQ_GET_TRANSACTIONS;

  constructor(public payload: any) {}
}

export class TransactionsGetRequestSuccessAction {
  static type: string = ActionNames.REQ_GET_TRANSACTIONS_SUCCESS;

  constructor(public payload: any) {}
}

export class TransactionsGetRequestFailedAction {
  static type: string = ActionNames.REQ_GET_TRANSACTIONS_FAILED;

  constructor(public payload: any) {}
}
