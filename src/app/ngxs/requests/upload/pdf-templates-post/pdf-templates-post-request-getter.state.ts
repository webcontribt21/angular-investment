import { Selector } from '@ngxs/store';

import { PdfTemplatesPostRequestStateModel, PdfTemplatessPostRequestState } from './pdf-templates-post-request.state';

export class PdfTemplatessPostRequestGetterState {
  @Selector([PdfTemplatessPostRequestState])
  static getPdfTemplatesPostRequestState(state: PdfTemplatesPostRequestStateModel): PdfTemplatesPostRequestStateModel {
    return state;
  }
}
