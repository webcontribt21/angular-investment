import { Selector } from '@ngxs/store';
import { InboxDocumentCategoriesGetRequestState, InboxDocumentCategoriesGetRequestStateModel } from './inbox-document-categories-get.state';

export class InboxDocumentCategoriesGetGetterState {
  @Selector([InboxDocumentCategoriesGetRequestState])
  getState(state: InboxDocumentCategoriesGetRequestStateModel) {
    return state;
  }
}
