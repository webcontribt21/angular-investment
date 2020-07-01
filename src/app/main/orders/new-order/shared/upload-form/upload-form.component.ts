import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { UploadService } from '../../../../../core/services';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent {
  @Input() downloadTexts: string[];
  @Input() titleText = 'ADDRESS_ORDER_PAGE.REQUIRED_FORM_FOR_SIGNATURE';
  @Input() noUpload = false;
  @Output() downloaded = new EventEmitter<boolean>();

  downloadLink$: Observable<string> = this.uploadService.downloadLink$;
  isDownloaded = false;

  constructor(private uploadService: UploadService) {}

  setDownloaded(d: boolean) {
    this.isDownloaded = d;
    this.downloaded.emit(d);
  }
}
