import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, switchMapTo, take, withLatestFrom } from 'rxjs/operators';

import { OrderTypeEnum } from '../../../../../core/enums/order-type.enum';
import { OrderService, UploadService } from '../../../../../core/services';
import { TaxExemptionAmountTypeEnum } from '../../../../../core/enums/tax-exemption-amount-type';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss'],
})
export class MakeOrderComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  isUploaded$: Observable<boolean>;
  makeOrderEvent$: Subject<any> = new Subject();
  amountPerPerson = 801;
  constructor(private router: Router, private uploadService: UploadService, private orderService: OrderService) {}

  ngOnInit() {
    this.uploadService.loadUploadLink({ path: 'tax-exemption' });

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
          withLatestFrom(this.orderService.taxExemptionFormValue$.pipe(map(res => res.model))),
        )
        .subscribe(([upload, taxForm]: any[]) => {
          let amount: number = null;
          if (taxForm.amountType === TaxExemptionAmountTypeEnum.useAmount || taxForm.amountType === TaxExemptionAmountTypeEnum.useFull) {
            amount = taxForm.amount;
          }
          const orderRequestData = {
            orderType: OrderTypeEnum.taxExemption,
            agreementS3ObjectKey: upload.key,
            germanTin: taxForm.germanTin,
            amountType: taxForm.amountType,
            amount,
            startDate: taxForm.startDate,
            endDate: taxForm.endDate,
            spouse: !!taxForm.spouse
              ? {
                  title: taxForm.spouse.title,
                  firstName: taxForm.spouse.firstName,
                  lastName: taxForm.spouse.lastName,
                  dateOfBirth: taxForm.spouse.birthDate,
                  germanTin: taxForm.spouse.germanTin,
                }
              : undefined,
          };
          this.orderService.createOrder(orderRequestData);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  changeDetails() {
    this.router.navigate(['/', 'orders', 'new', 'tax-exemption']);
  }

  makeOrder() {
    this.makeOrderEvent$.next();
  }
}
