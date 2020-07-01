import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Store } from '@ngxs/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { withLatestFrom, filter } from 'rxjs/operators';

import { UploadService } from '../../../core/services';
import { RemoveFileUploadAction } from '../../../ngxs/upload/upload.actions';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
})
export class UploadButtonComponent implements OnInit, OnDestroy {
  @ViewChild('fileUpload') fileUpload: any;

  isUploaded$: Observable<boolean> = this.uploadService.isUploaded$;
  loadFile$: Subject<File> = new Subject();

  subscriptions: Subscription[] = [];
  isNotPdfFormat = false;
  fileName = '';

  constructor(private store: Store, private uploadService: UploadService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.loadFile$
        .pipe(
          withLatestFrom(this.isUploaded$),
          filter(([file, isUploaded]: [File, boolean]) => !!file && !isUploaded),
        )
        .subscribe(([file]) => {
          this.fileName = file.name;
          this.isNotPdfFormat = false;
          this.uploadService.uploadFile(file);
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  onLoad(event) {
    const file: File = event.files[0];
    if (file.type !== 'application/pdf') {
      this.removeFile();
      return (this.isNotPdfFormat = true);
    }
    this.loadFile$.next(file);
  }

  removeFile() {
    this.fileName = '';
    this.fileUpload.clear();
    this.store.dispatch(RemoveFileUploadAction);
  }
}
