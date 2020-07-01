export const ActionTypes = {
  CREATE_PDF_TEMPLATE: '[Upload] Create Pdf Template',
  CREATE_PDF_TEMPLATE_SUCCESS: '[Upload] Create Pdf Template Success',
  CREATE_PDF_TEMPLATE_FAIL: '[Upload] Create Pdf Template Fail',

  LOAD_UPLOAD_URL: '[Upload] Load Upload Url',
  LOAD_UPLOAD_URL_SUCCESS: '[Upload] Load Upload Url Success',
  LOAD_UPLOAD_URL_FAIL: '[Upload] Load Upload Url Fail',

  UPLOAD_FILE: '[Upload] Upload File',
  UPLOAD_FILE_SUCCESS: '[Upload] Upload File Success',
  UPLOAD_FILE_FAIL: '[Upload] Upload File Fail',

  CLEAR_UPLOAD: '[Upload] Clear Upload',
  REMOVE_FILE_UPLOAD: '[Upload] Remove File Upload',
};

export class CreatePdfTemplateAction {
  static type = ActionTypes.CREATE_PDF_TEMPLATE;

  constructor(public payload: any) {}
}
export class CreatePdfTemplateSuccessAction {
  static type = ActionTypes.CREATE_PDF_TEMPLATE_SUCCESS;

  constructor(public payload: any) {}
}
export class CreatePdfTemplateFailAction {
  static type = ActionTypes.CREATE_PDF_TEMPLATE_FAIL;

  constructor(public payload: any) {}
}

export class LoadUploadUrlAction {
  static type = ActionTypes.LOAD_UPLOAD_URL;

  constructor(public payload?: any) {}
}
export class LoadUploadUrlSuccessAction {
  static type = ActionTypes.LOAD_UPLOAD_URL_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadUploadUrlFailAction {
  static type = ActionTypes.LOAD_UPLOAD_URL_FAIL;

  constructor(public payload: any) {}
}

export class UploadFileAction {
  static type = ActionTypes.UPLOAD_FILE;

  constructor(public payload: any) {}
}
export class UploadFileSuccessAction {
  static type = ActionTypes.UPLOAD_FILE_SUCCESS;

  constructor(public payload: any) {}
}
export class UploadFileFailAction {
  static type = ActionTypes.UPLOAD_FILE_FAIL;

  constructor(public payload: any) {}
}

export class ClearUploadAction {
  static type = ActionTypes.CLEAR_UPLOAD;

  constructor(public payload?: any) {}
}

export class RemoveFileUploadAction {
  static type = ActionTypes.REMOVE_FILE_UPLOAD;

  constructor(public payload?: any) {}
}
