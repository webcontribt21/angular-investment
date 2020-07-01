import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { filter, map, switchMapTo, take, withLatestFrom } from 'rxjs/operators';

import { OrderTypeEnum } from '../../../../../core/enums/order-type.enum';
import { OrderService, UploadService } from '../../../../../core/services';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss'],
})
export class MakeOrderComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  makeOrderEvent$: Subject<any> = new Subject();
  isDownloaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, private uploadService: UploadService, private orderService: OrderService) {}

  ngOnInit() {
    this.subscriptions.push(
      // navigate user to first step if no download link
      this.uploadService.downloadLink$.pipe(filter(res => !res)).subscribe(() => {
        this.changeDetails();
      }),

      // make order
      this.makeOrderEvent$
        .pipe(
          switchMapTo(this.uploadService.downloadKey$.pipe(take(1))),
          filter(res => !!res),
          withLatestFrom(this.orderService.referenceAccountFormValue$.pipe(map(res => res.model && res.model.bankAccount))),
        )
        .subscribe(([key, bankAccount]: any[]) => {
          const orderRequestData = {
            orderType: OrderTypeEnum.referenceAccountChange,
            ...bankAccount,
            templateS3ObjectKey: key,
          };
          this.orderService.createOrder(orderRequestData);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  changeDetails() {
    this.router.navigate(['/', 'orders', 'new', 'reference-account']);
  }

  makeOrder() {
    this.makeOrderEvent$.next();
  }
}
