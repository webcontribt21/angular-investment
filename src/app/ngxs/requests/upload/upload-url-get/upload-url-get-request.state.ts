import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  UploadUrlGetRequestAction,
  UploadUrlGetRequestFailAction,
  UploadUrlGetRequestSuccessAction,
} from './upload-url-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { UploadService } from '../../../../core/services';
import { LoadUploadUrlFailAction, LoadUploadUrlSuccessAction } from '../../../upload/upload.actions';
import { Injectable } from '@angular/core';

export interface UploadUrlGetRequestStateModel extends IRequestsNestedState {}

@State<UploadUrlGetRequestStateModel>({
  name: 'uploadUrlGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class UploadUrlGetRequestState {
  constructor(private uploadService: UploadService) {}

  @Action(UploadUrlGetRequestAction)
  uploadUrlGetRequest(ctx: StateContext<UploadUrlGetRequestStateModel>, action: UploadUrlGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.uploadService.loadUploadLinkRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new UploadUrlGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new UploadUrlGetRequestFailAction(error));
      }),
    );
  }

  @Action(UploadUrlGetRequestSuccessAction)
  uploadUrlGetRequestSuccess(ctx: StateContext<UploadUrlGetRequestStateModel>, action: UploadUrlGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadUploadUrlSuccessAction(action.payload));
  }

  @Action(UploadUrlGetRequestFailAction)
  uploadUrlGetRequestFail(ctx: StateContext<UploadUrlGetRequestStateModel>, action: UploadUrlGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadUploadUrlFailAction(action.payload));
  }
}
