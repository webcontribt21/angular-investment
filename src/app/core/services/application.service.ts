import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, switchMapTo, take } from 'rxjs/operators';
import { Message, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import * as _ from 'lodash';

import { MediaQuery, MediaQueries } from '../models/common';
import { ApplicationGetterState, AppMediaStateModel } from '../../ngxs/application';
import { UpdateAppMediaAction } from '../../ngxs/application/application.actions';
import { PAGINATION_LIMIT } from '../constants/pagination-limit.const';
import { IRequestsNestedState } from '../../ngxs/requests/requests.interface';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  @Select(ApplicationGetterState.getAppMedia)
  appMedia$: Observable<AppMediaStateModel>;

  @Select(ApplicationGetterState.getGreeting)
  greeting$: Observable<string>;

  isDesktop$: Observable<boolean>;
  isTabletsHorizontal$: Observable<boolean>;
  isMobile$: Observable<boolean>;

  currentModalRef: DynamicDialogRef;

  constructor(
    private store: Store,
    private messageService: MessageService,
    private dialogService: DialogService,
    private router: Router,
    @Inject(PAGINATION_LIMIT) public paginationLimit,
  ) {
    this.isDesktop$ = this.appMedia$.pipe(map(res => res[MediaQueries.isDesktop.name]));
    this.isTabletsHorizontal$ = this.appMedia$.pipe(map(res => res[MediaQueries.isTabletsHorizontal.name]));
    this.isMobile$ = this.appMedia$.pipe(map(res => res[MediaQueries.isMobile.name]));
  }

  updateAppMedia(type: MediaQuery, matches: boolean) {
    this.store.dispatch(new UpdateAppMediaAction({ type, matches }));
  }

  openModal(componentRef, data: any = {}) {
    const config: DynamicDialogConfig = {
      showHeader: true,
      closable: true,
      dismissableMask: true,
      ...data,
    };
    this.currentModalRef = this.dialogService.open(componentRef, config);
  }

  closeModal() {
    if (this.currentModalRef) {
      this.currentModalRef.close();
    }
  }

  showToastr(msg: string | string[]) {
    if (!msg || msg === '') {
      return;
    }

    const msgArr: Message[] = [].concat(msg).map(message => {
      return {
        severity: 'success',
        summary: '',
        detail: message,
        life: 4000,
        closable: true,
      };
    });

    this.messageService.addAll(msgArr);
  }

  showErrorToastr(msg: string | string[]) {
    msg = _.uniq([].concat(msg));
    const msgArr: Message[] = msg.map(message => {
      return {
        severity: 'error',
        summary: '',
        detail: message,
        life: 4000,
        closable: true,
      };
    });

    this.messageService.addAll(msgArr);
  }

  redirectOnApiResponseError() {
    return (obs: Observable<IRequestsNestedState>) => {
      return obs.pipe(
        map(requestState => requestState.loading),
        filter(res => !!res),
        switchMapTo(obs.pipe(filter(requestState => requestState.loaded))),
        map(requestState => {
          if (requestState.status === 'fail') {
            this.router.navigate(['/']);
            return true;
          }
        }),
        take(1),
      );
    };
  }
}
