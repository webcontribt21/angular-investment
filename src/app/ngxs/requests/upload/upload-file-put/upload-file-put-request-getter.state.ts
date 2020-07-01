import { Selector } from '@ngxs/store';

import { UploadFilePutRequestStateModel, UploadFilePutRequestState } from './upload-file-put-request.state';

export class UploadFilePutRequestGetterState {
  @Selector([UploadFilePutRequestState])
  static getUploadFilePutRequestState(state: UploadFilePutRequestStateModel): UploadFilePutRequestStateModel {
    return state;
  }
}
