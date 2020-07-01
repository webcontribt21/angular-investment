export const ActionTypes = {
  SET_SELF_DATA: `[User] Set Self Data`,
  CLEAR_SELF_DATA: `[User] Clear Self Data`,

  LOAD_SELF_DATA: '[User] Load Self Data',
  LOAD_SELF_DATA_SUCCESS: '[User] Load Self Data Success',
  LOAD_SELF_DATA_FAIL: '[User] Load Self Data Fail',

  CHANGE_PASSWORD: '[User] Change Password',
  CHANGE_PASSWORD_SUCCESS: '[User] Change Password Success',
  CHANGE_PASSWORD_FAIL: '[User] Change Password Fail',

  CHANGE_EMAIL: '[User] Change Email',
  CHANGE_EMAIL_SUCCESS: '[User] Change Email Success',
  CHANGE_EMAIL_FAIL: '[User] Change Email Fail',

  SAVE_USER: '[User] Save User',
  SAVE_USER_SUCCESS: '[User] Save User Success',
  SAVE_USER_FAIL: '[User] Save User Fail',
};

export class SetSelfDataAction {
  static type = ActionTypes.SET_SELF_DATA;

  constructor(public payload?: any) {}
}

export class ClearSelfDataAction {
  static type = ActionTypes.CLEAR_SELF_DATA;

  constructor(public payload?: string) {}
}

export class LoadSelfDataAction {
  static type = ActionTypes.LOAD_SELF_DATA;

  constructor(public payload?: any, public redirect: boolean = false) {}
}
export class LoadSelfDataSuccessAction {
  static type = ActionTypes.LOAD_SELF_DATA_SUCCESS;

  constructor(public payload?: any, public redirect?: any) {}
}
export class LoadSelfDataFailAction {
  static type = ActionTypes.LOAD_SELF_DATA_FAIL;

  constructor(public payload?: any) {}
}

export class ChangePasswordAction {
  static type = ActionTypes.CHANGE_PASSWORD;

  constructor(public payload?: any) {}
}
export class ChangePasswordSuccessAction {
  static type = ActionTypes.CHANGE_PASSWORD_SUCCESS;

  constructor(public payload?: any) {}
}
export class ChangePasswordFailAction {
  static type = ActionTypes.CHANGE_PASSWORD_FAIL;

  constructor(public payload?: any) {}
}

export class ChangeEmailAction {
  static type = ActionTypes.CHANGE_EMAIL;

  constructor(public payload?: any) {}
}
export class ChangeEmailSuccessAction {
  static type = ActionTypes.CHANGE_EMAIL_SUCCESS;

  constructor(public payload?: any) {}
}
export class ChangeEmailFailAction {
  static type = ActionTypes.CHANGE_EMAIL_FAIL;

  constructor(public payload?: any) {}
}

export class SaveUserAction {
  static type = ActionTypes.SAVE_USER;

  constructor(public payload?: any) {}
}
export class SaveUserSuccessAction {
  static type = ActionTypes.SAVE_USER_SUCCESS;

  constructor(public payload?: any) {}
}
export class SaveUserFailAction {
  static type = ActionTypes.SAVE_USER_FAIL;

  constructor(public payload?: any) {}
}
