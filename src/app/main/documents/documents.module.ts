import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../shared/shared.module';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { DocumentsInfoModule } from './documents-info/documents-info.module';
import { DocumentsListModule } from './documents-list/documents-list.module';

@NgModule({
  declarations: [DocumentsComponent],
  imports: [DocumentsRoutingModule, AppSharedModule, DocumentsInfoModule, DocumentsListModule],
})
export class DocumentsModule {}
