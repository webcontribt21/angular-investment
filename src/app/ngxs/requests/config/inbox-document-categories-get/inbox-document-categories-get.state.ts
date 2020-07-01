import { IRequestsNestedState } from '../../requests.interface';
import { Action, State, StateContext } from '@ngxs/store';
import { ConfigService } from '../../../../core/services';
import {
  InboxDocumentCategoriesGetRequestAction,
  InboxDocumentCategoriesGetRequestFailAction,
  InboxDocumentCategoriesGetRequestSuccessAction,
} from './inbox-document-categories-get.actions';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { LoadInboxDocumentCategoriesFailAction, LoadInboxDocumentCategoriesSuccessAction } from '../../../config/config.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface InboxDocumentCategoriesGetRequestStateModel extends IRequestsNestedState {}

@State<InboxDocumentCategoriesGetRequestStateModel>({
  name: 'inboxDocumentCategoriesGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class InboxDocumentCategoriesGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(InboxDocumentCategoriesGetRequestAction)
  inboxDocumentCategoriesGetRequest(ctx: StateContext<InboxDocumentCategoriesGetRequestStateModel>) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.inboxDocumentCategories).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new InboxDocumentCategoriesGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InboxDocumentCategoriesGetRequestFailAction(error));
      }),
    );
  }

  @Action(InboxDocumentCategoriesGetRequestSuccessAction)
  inboxDocumentCategoriesGetRequestSuccess(
    ctx: StateContext<InboxDocumentCategoriesGetRequestStateModel>,
    action: InboxDocumentCategoriesGetRequestSuccessAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadInboxDocumentCategoriesSuccessAction(action.payload));
  }

  @Action(InboxDocumentCategoriesGetRequestFailAction)
  inboxDocumentCategoriesGetRequestFail(
    ctx: StateContext<InboxDocumentCategoriesGetRequestStateModel>,
    action: InboxDocumentCategoriesGetRequestFailAction,
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadInboxDocumentCategoriesFailAction(action.payload));
  }
}
