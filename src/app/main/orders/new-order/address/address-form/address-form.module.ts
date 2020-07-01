import { NgModule } from '@angular/core';

import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { AddressFormComponent } from './address-form.component';
import { AppSharedModule } from '../../../../../shared/shared.module';
import { UploadNoteModule } from '../../shared/upload-note/upload-note.module';

@NgModule({
  declarations: [AddressFormComponent],
  imports: [AppSharedModule, NgxsFormPluginModule, UploadNoteModule],
  exports: [AddressFormComponent],
})
export class AddressFormModule {}
