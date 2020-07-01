import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import {
  ClearUploadAction,
  CreatePdfTemplateAction,
  CreatePdfTemplateSuccessAction,
  LoadUploadUrlAction,
  LoadUploadUrlSuccessAction,
  RemoveFileUploadAction,
  UploadFileAction,
  UploadFileSuccessAction,
} from './upload.actions';
import { UploadUrlGetRequestAction } from '../requests/upload/upload-url-get/upload-url-get-request.actions';
import { ApplicationService } from '../../core/services/application.service';
import { UploadFilePutRequestAction } from '../requests/upload/upload-file-put/upload-file-put-request.actions';
import { PdfTemplatesPostRequestAction } from '../requests/upload/pdf-templates-post/pdf-templates-post-request.actions';
import { Injectable } from '@angular/core';

export interface UploadStateModel {
  downloadPdfLink: string;
  downloadPdfKey: string;
  upload: {
    key: string;
    url: string;
  };
  isUploaded: boolean;
}

@State<UploadStateModel>({
  name: 'upload',
  defaults: {
    downloadPdfLink: null,
    downloadPdfKey: null,
    upload: null,
    isUploaded: false,
  },
})
@Injectable()
export class UploadState implements NgxsOnInit {
  constructor(private applicationService: ApplicationService, private store: Store) {}

  ngxsOnInit(ctx: StateContext<UploadStateModel>) {}

  @Action(CreatePdfTemplateAction)
  createPdfTemplate(ctx: StateContext<UploadStateModel>, action: CreatePdfTemplateAction) {
    ctx.dispatch(new PdfTemplatesPostRequestAction(action.payload));
  }

  @Action(CreatePdfTemplateSuccessAction)
  createPdfTemplateSuccess(ctx: StateContext<UploadStateModel>, action: CreatePdfTemplateSuccessAction) {
    const downloadPdfLink: string = action.payload.pdfDocumentUrl;
    const downloadPdfKey: string = action.payload.objectKey;
    ctx.patchState({
      downloadPdfLink,
      downloadPdfKey,
    });
    const currentRoute: string = this.store.selectSnapshot(state => state.router.state.url);
    ctx.dispatch(new Navigate([currentRoute, { 'make-order': true }]));
  }

  @Action(LoadUploadUrlAction)
  loadUploadUrl(ctx: StateContext<UploadStateModel>, action: LoadUploadUrlAction) {
    ctx.dispatch(new UploadUrlGetRequestAction(action.payload));
  }

  @Action(LoadUploadUrlSuccessAction)
  loadUploadUrlSuccess(ctx: StateContext<UploadStateModel>, action: LoadUploadUrlSuccessAction) {
    const upload = {
      key: action.payload.objectKey,
      url: action.payload.uploadUrl,
    };
    ctx.patchState({
      upload,
    });
  }

  @Action(UploadFileAction)
  uploadFile(ctx: StateContext<UploadStateModel>, action: UploadFileAction) {
    const url: string = ctx.getState().upload && ctx.getState().upload.url;
    if (!url) {
      return;
    }
    ctx.dispatch(new UploadFilePutRequestAction({ file: action.payload, url }));
  }

  @Action(UploadFileSuccessAction)
  uploadFileSuccess(ctx: StateContext<UploadStateModel>, action: UploadFileSuccessAction) {
    ctx.patchState({
      isUploaded: true,
    });
  }

  @Action(ClearUploadAction)
  clearUpload(ctx: StateContext<UploadStateModel>, action: ClearUploadAction) {
    ctx.patchState({
      upload: null,
    });
    ctx.dispatch(new RemoveFileUploadAction());
  }

  @Action(RemoveFileUploadAction)
  removeUploadFile(ctx: StateContext<UploadStateModel>, action: RemoveFileUploadAction) {
    ctx.patchState({
      isUploaded: false,
    });
  }
}
