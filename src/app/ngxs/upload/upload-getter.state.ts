import { Selector } from '@ngxs/store';

import { UploadState, UploadStateModel } from './upload.state';

export class UploadGetterState {
  @Selector([UploadState])
  static getUploadState(state: UploadStateModel): UploadStateModel {
    return state;
  }

  @Selector([UploadState])
  static getUpload(state: UploadStateModel): { key: string; url: string } {
    return state.upload;
  }

  @Selector([UploadState])
  static getDownloadLink(state: UploadStateModel): string {
    return state.downloadPdfLink;
  }

  @Selector([UploadState])
  static getDownloadKey(state: UploadStateModel): string {
    return state.downloadPdfKey;
  }

  @Selector([UploadState])
  static getIsUploaded(state: UploadStateModel): boolean {
    return state.isUploaded;
  }
}
