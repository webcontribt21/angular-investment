import { NgModule } from '@angular/core';

import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { ReferenceAccountFormComponent } from './reference-account-form.component';
import { AppSharedModule } from '../../../../../shared/shared.module';
import { UploadNoteModule } from '../../shared/upload-note/upload-note.module';

@NgModule({
  declarations: [ReferenceAccountFormComponent],
  imports: [AppSharedModule, NgxsFormPluginModule, UploadNoteModule],
  exports: [ReferenceAccountFormComponent],
})
export class ReferenceAccountFormModule {}
