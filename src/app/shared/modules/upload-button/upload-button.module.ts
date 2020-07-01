import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'primeng/fileupload';

import { UploadButtonComponent } from './upload-button.component';

@NgModule({
  declarations: [UploadButtonComponent],
  imports: [CommonModule, FileUploadModule, TranslateModule],
  exports: [UploadButtonComponent],
})
export class UploadButtonModule {}
