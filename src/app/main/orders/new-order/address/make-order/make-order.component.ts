import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, switchMapTo, take, withLatestFrom } from 'rxjs/operators';

import { OrderTypeEnum } from '../../../../../core/enums/order-type.enum';
import { OrderService, UploadService, ConfigService } from '../../../../../core/services';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss'],
})
export class MakeOrderComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  isUploaded$: Observable<boolean>;
  makeOrderEvent$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private uploadService: UploadService,
    private orderService: OrderService,
    private configService: ConfigService,
  ) {}

  ngOnInit() {
    this.uploadService.loadUploadLink({ path: 'address-change' });

    this.isUploaded$ = this.uploadService.isUploaded$;

    this.subscriptions.push(
      // navigate user to first step if no download link
      this.uploadService.downloadLink$.pipe(filter(res => !res)).subscribe(() => {
        this.changeDetails();
      }),

      // make order
      this.makeOrderEvent$
        .pipe(
          switchMapTo(this.uploadService.upload$.pipe(take(1))),
          filter(res => !!res),
          withLatestFrom(
            this.orderService.newAddressFormValue$.pipe(map(res => res.model && res.model.address)),
            this.configService.countries$,
          ),
        )
        .subscribe(([upload, address, countries]: any[]) => {
          const orderRequestData = {
            orderType: OrderTypeEnum.addressChange,
            street: address.streetName,
            postalCode: address.postalCode,
            streetNumber: address.buildingNumber,
            city: address.city,
            country: countries.find(x => x.label.de === address.countryName).code,
            agreementS3ObjectKey: upload.key,
          };
          this.orderService.createOrder(orderRequestData);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  changeDetails() {
    this.router.navigate(['/', 'orders', 'new', 'address']);
  }

  makeOrder() {
    this.makeOrderEvent$.next();
  }
}
