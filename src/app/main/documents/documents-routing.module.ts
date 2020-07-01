import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsComponent } from './documents.component';
import { InboxDocumentCategoriesResolver } from '../../core/resolvers/inbox-document-categories.resolver';
import { CustomerDocumentsResolver } from '../../core/resolvers/customer-documents.resolver';
import { CustomerLatestDocumentResolver } from '../../core/resolvers/customer-latest-document.resolver';

const routes: Routes = [
  {
    path: '',
    component: DocumentsComponent,
    resolve: {
      documents: CustomerDocumentsResolver,
      inboxDocuments: InboxDocumentCategoriesResolver,
      latestDocument: CustomerLatestDocumentResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule {}
