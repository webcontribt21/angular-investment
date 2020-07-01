import { NgModule } from '@angular/core';

import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { TaxExemptionFormComponent } from './tax-exemption-form.component';
import { AppSharedModule } from '../../../../../shared/shared.module';
import { UploadNoteModule } from '../../shared/upload-note/upload-note.module';

@NgModule({
  declarations: [TaxExemptionFormComponent],
  imports: [AppSharedModule, NgxsFormPluginModule, UploadNoteModule],
  exports: [TaxExemptionFormComponent],
})
export class TaxExemptionFormModule {}
