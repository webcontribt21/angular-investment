import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';

import { Customer } from '../models';
import { CustomerService } from './customer.service';

import { UploadGetterState } from '../../ngxs/upload';
import { ClearUploadAction, CreatePdfTemplateAction, LoadUploadUrlAction, UploadFileAction } from '../../ngxs/upload/upload.actions';
import { IRequestsNestedState } from '../../ngxs/requests/requests.interface';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  @Select(UploadGetterState.getUpload)
  upload$: Observable<{ key: string; url: string }>;
  uploadUrlRequestState$: Observable<IRequestsNestedState>;

  @Select(UploadGetterState.getDownloadLink)
  downloadLink$: Observable<string>;

  @Select(UploadGetterState.getDownloadKey)
  downloadKey$: Observable<string>;

  @Select(UploadGetterState.getIsUploaded)
  isUploaded$: Observable<boolean>;

  constructor(private store: Store, private httpClient: HttpClient, private customerService: CustomerService) {
    this.uploadUrlRequestState$ = this.store.select(state => state.requests.uploadUrlGetRequestState);
  }

  createPdfTemplate(payload) {
    this.store.dispatch(new CreatePdfTemplateAction(payload));
  }

  createPdfTemplateRequest(payload) {
    return this.httpClient.post('media/pdf-templates', payload);
  }

  loadUploadLink(payload?) {
    this.store.dispatch(new LoadUploadUrlAction(payload));
  }

  loadUploadLinkRequest({ path, extension }: { path: string; extension?: string }) {
    extension = extension || 'PDF';
    const date: string = new Date().toISOString().slice(0, 10);
    return this.customerService.selectedCustomer$.pipe(
      filter(res => !!res),
      take(1),
      switchMap((selectedCustomer: Customer) => {
        const body = {
          extension,
          prefix: `${path}/${selectedCustomer.id}/${date}`,
        };
        return this.httpClient.post(`media/upload-urls`, body);
      }),
    );
  }

  uploadFile(file: File) {
    this.store.dispatch(new UploadFileAction(file));
  }

  uploadFileRequest(data: { file: File; url: string }) {
    return this.httpClient.put(data.url, data.file);
  }

  clearUpload() {
    this.store.dispatch(new ClearUploadAction());
  }
}
