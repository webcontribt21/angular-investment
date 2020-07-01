import { Selector } from '@ngxs/store';

import { UploadUrlGetRequestStateModel, UploadUrlGetRequestState } from './upload-url-get-request.state';

export class UploadUrlGetRequestGetterState {
  @Selector([UploadUrlGetRequestState])
  static getUploadUrlGetRequestState(state: UploadUrlGetRequestStateModel): UploadUrlGetRequestStateModel {
    return state;
  }
}
