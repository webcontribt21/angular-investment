import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../../../shared/shared.module';

import { UploadFormComponent } from './upload-form.component';

@NgModule({
  declarations: [UploadFormComponent],
  imports: [AppSharedModule],
  exports: [UploadFormComponent],
})
export class UploadFormModule {}
