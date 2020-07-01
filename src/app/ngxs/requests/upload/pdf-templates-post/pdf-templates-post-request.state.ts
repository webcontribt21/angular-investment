import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  PdfTemplatesPostRequestAction,
  PdfTemplatesPostRequestFailAction,
  PdfTemplatesPostRequestSuccessAction,
} from './pdf-templates-post-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { UploadService } from '../../../../core/services';
import { CreatePdfTemplateFailAction, CreatePdfTemplateSuccessAction } from '../../../upload/upload.actions';
import { Injectable } from '@angular/core';

export interface PdfTemplatesPostRequestStateModel extends IRequestsNestedState {}

@State<PdfTemplatesPostRequestStateModel>({
  name: 'pdfTemplatesPostRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class PdfTemplatessPostRequestState {
  constructor(private uploadService: UploadService) {}

  @Action(PdfTemplatesPostRequestAction)
  pdfTemplatesPostRequest(ctx: StateContext<PdfTemplatesPostRequestStateModel>, action: PdfTemplatesPostRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.uploadService.createPdfTemplateRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new PdfTemplatesPostRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new PdfTemplatesPostRequestFailAction(error));
      }),
    );
  }

  @Action(PdfTemplatesPostRequestSuccessAction)
  pdfTemplatesPostRequestSuccess(ctx: StateContext<PdfTemplatesPostRequestStateModel>, action: PdfTemplatesPostRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new CreatePdfTemplateSuccessAction(action.payload));
  }

  @Action(PdfTemplatesPostRequestFailAction)
  pdfTemplatesPostRequestFail(ctx: StateContext<PdfTemplatesPostRequestStateModel>, action: PdfTemplatesPostRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new CreatePdfTemplateFailAction(action.payload));
  }
}
