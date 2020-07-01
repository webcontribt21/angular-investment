import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  UploadFilePutRequestAction,
  UploadFilePutRequestFailAction,
  UploadFilePutRequestSuccessAction,
} from './upload-file-put-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { UploadService } from '../../../../core/services';
import { UploadFileFailAction, UploadFileSuccessAction } from '../../../upload/upload.actions';
import { Injectable } from '@angular/core';

export interface UploadFilePutRequestStateModel extends IRequestsNestedState {}

@State<UploadFilePutRequestStateModel>({
  name: 'uploadFilePutRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class UploadFilePutRequestState {
  constructor(private uploadService: UploadService) {}

  @Action(UploadFilePutRequestAction)
  uploadFilePutRequest(ctx: StateContext<UploadFilePutRequestStateModel>, action: UploadFilePutRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.uploadService.uploadFileRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new UploadFilePutRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new UploadFilePutRequestFailAction(error));
      }),
    );
  }

  @Action(UploadFilePutRequestSuccessAction)
  uploadFilePutRequestSuccess(ctx: StateContext<UploadFilePutRequestStateModel>, action: UploadFilePutRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new UploadFileSuccessAction(action.payload));
  }

  @Action(UploadFilePutRequestFailAction)
  uploadFilePutRequestFail(ctx: StateContext<UploadFilePutRequestStateModel>, action: UploadFilePutRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new UploadFileFailAction(action.payload));
  }
}
