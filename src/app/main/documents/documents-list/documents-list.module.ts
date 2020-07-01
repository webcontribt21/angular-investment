import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../shared/shared.module';

import { DocumentsListComponent } from './documents-list.component';

@NgModule({
  declarations: [DocumentsListComponent],
  imports: [AppSharedModule],
  exports: [DocumentsListComponent],
})
export class DocumentsListModule {}
