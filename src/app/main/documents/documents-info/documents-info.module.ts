import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../shared/shared.module';

import { DocumentsInfoComponent } from './documents-info.component';

@NgModule({
  declarations: [DocumentsInfoComponent],
  imports: [AppSharedModule],
  exports: [DocumentsInfoComponent],
})
export class DocumentsInfoModule {}
