import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../../../../shared/shared.module';

import { UploadNoteModule } from '../../shared/upload-note/upload-note.module';
import { UploadFormModule } from '../../shared/upload-form/upload-form.module';

import { MakeOrderComponent } from './make-order.component';

@NgModule({
  declarations: [MakeOrderComponent],
  imports: [AppSharedModule, UploadNoteModule, UploadFormModule],
  exports: [MakeOrderComponent],
})
export class MakeOrderModule {}
