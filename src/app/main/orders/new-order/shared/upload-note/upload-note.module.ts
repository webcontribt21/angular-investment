import { NgModule } from '@angular/core';

import { UploadNoteComponent } from './upload-note.component';
import { AppSharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [UploadNoteComponent],
  imports: [AppSharedModule],
  exports: [UploadNoteComponent],
})
export class UploadNoteModule {}
