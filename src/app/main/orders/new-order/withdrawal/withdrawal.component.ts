import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { filter, map, take, withLatestFrom, first } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';

import { Customer, InvestmentStrategy, Portfolio } from '../../../../core/models';
import { ApeironService, ApplicationService, CustomerService, I18nService, OrderService } from '../../../../core/services';
import { OrderTypeEnum } from '../../../../core/enums/order-type.enum';
import { FullWithdrawReasonEnum, WithdrawReasonEnum } from '../../../../core/enums/withdraw-reason.enum';
import { OrderCreationConstraintModalComponent } from '../../../../shared/modals/order-creation-constraint-modal/order-creation-constraint-modal.component';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
})
export class WithdrawalComponent implements OnInit {
  portfolio$: Observable<Portfolio>;
  selectedCustomer$: Observable<Customer>;
  investmentStrategy$: Observable<InvestmentStrategy>;
  translatedFullWithdrawReasons$: Observable<SelectItem[]>;
  translatedWithdrawReasons$: Observable<SelectItem[]>;

  withdrawalOrderForm: FormGroup;
  orderTypeEnum = OrderTypeEnum;
  fullWithdrawReasonEnum = FullWithdrawReasonEnum;
  withdrawReasonEnum = WithdrawReasonEnum;

  fullWithdrawReasons = Object.values(this.fullWithdrawReasonEnum).map(val => ({ val }));
  withdrawReasons = Object.values(this.withdrawReasonEnum).map(val => ({ val }));
  otherReasonValue: string;
  fullWithdrawEvent$: Subject<boolean> = new Subject();
  fullWithdrawControl: FormControl = new FormControl(false);

  get amountFormControl() {
    return this.withdrawalOrderForm.get('amount') as FormControl;
  }
  get confirmFormControl() {
    return this.withdrawalOrderForm.get('confirm') as FormControl;
  }
  get reasonFormControl() {
    return this.withdrawalOrderForm.get('reason') as FormControl;
  }
  get otherReasonFormControl() {
    return this.withdrawalOrderForm.get('otherReason') as FormControl;
  }

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService,
    private apeironService: ApeironService,
    private applicationService: ApplicationService,
    private i18nService: I18nService,
  ) {}

  ngOnInit(): void {
    this.investmentStrategy$ = this.customerService.investmentStrategy$;
    this.portfolio$ = this.apeironService.portfolio$.pipe(filter(res => !!res));
    this.selectedCustomer$ = this.customerService.selectedCustomer$.pipe(
      filter(res => !!res),
      take(1),
    );

    const fullReasons: string[] = this.fullWithdrawReasons.map(item => item.val);
    this.translatedFullWithdrawReasons$ = this.i18nService.getTranslationByKeys(fullReasons).pipe(
      map(translatedItems => {
        const translatedItemOther = translatedItems.find(item => item.value === this.fullWithdrawReasonEnum.other);
        this.otherReasonValue = translatedItemOther.label;
        // reset control on lang change for the proper validation
        this.reasonFormControl.reset();
        return translatedItems.map(translatedItem => ({
          ...translatedItem,
          value: translatedItem.label,
        }));
      }),
    );

    const reasons: string[] = this.withdrawReasons.map(item => item.val);
    this.translatedWithdrawReasons$ = this.i18nService.getTranslationByKeys(reasons).pipe(
      map(translatedItems => {
        const translatedItemOther = translatedItems.find(item => item.value === this.withdrawReasonEnum.other);
        this.otherReasonValue = translatedItemOther.label;
        // reset control on lang change for the proper validation
        this.reasonFormControl.reset();
        return translatedItems.map(translatedItem => ({
          ...translatedItem,
          value: translatedItem.label,
        }));
      }),
    );

    this.withdrawalOrderForm = new FormGroup({
      amount: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [this.validateWithdrawalAmount.bind(this)],
        updateOn: 'change',
      }),
    });

    this.setupAmountControl();

    this.fullWithdrawEvent$.pipe(withLatestFrom(this.orderService.orderConstraints$)).subscribe(([fullWithdraw, constraints]) => {
      // when switcher off
      if (!fullWithdraw) {
        this.setupAmountControl();
        this.withdrawalOrderForm.removeControl('reason');
        this.withdrawalOrderForm.removeControl('otherReason');
        this.withdrawalOrderForm.removeControl('confirm');
        return;
      }

      // when switcher on and full withdrawal order can be created
      if (constraints[OrderTypeEnum.fullWithdrawal].canBeCreated) {
        this.withdrawalOrderForm.removeControl('amount');
        this.withdrawalOrderForm.addControl('reason', new FormControl(null, [Validators.required]));
        this.withdrawalOrderForm.addControl('confirm', new FormControl(false, [Validators.requiredTrue]));
        return;
      }

      // when full withdrawal order can't be created
      this.fullWithdrawControl.patchValue(false);
      this.applicationService.openModal(OrderCreationConstraintModalComponent, {
        styleClass: 'order-creation-constraint-modal',
      });
    });
  }

  handleChange(e) {
    this.fullWithdrawEvent$.next(e.checked);
  }

  selectReason(e) {
    this.withdrawalOrderForm.removeControl('otherReason');
    if (e.value === this.otherReasonValue) {
      this.withdrawalOrderForm.addControl('otherReason', new FormControl(null, [Validators.required]));
    }
  }

  setupAmountControl() {
    if (!this.amountFormControl) {
      this.withdrawalOrderForm.addControl(
        'amount',
        new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [this.validateWithdrawalAmount.bind(this)],
          updateOn: 'change',
        }),
      );
    }

    this.amountFormControl.valueChanges.pipe(withLatestFrom(this.portfolio$)).subscribe(([value, { currentBalance }]) => {
      if (this.amountFormControl.valid && value >= Math.max(currentBalance * 0.1, 15000)) {
        this.withdrawalOrderForm.addControl('reason', new FormControl(null, [Validators.required]));
      } else {
        this.withdrawalOrderForm.removeControl('reason');
        this.withdrawalOrderForm.removeControl('otherReason');
      }
      this.withdrawalOrderForm.updateValueAndValidity();
    });
  }

  validateWithdrawalAmount(fc: FormControl): Observable<{ [key: string]: boolean } | null> {
    return this.selectedCustomer$.pipe(
      withLatestFrom(this.portfolio$),
      map(([{ currentRecurringDeposit }, { currentBalance }]: [Customer, Portfolio]) => {
        const remainedBalance: number = currentBalance - fc.value;
        const a = remainedBalance >= (currentRecurringDeposit.amount >= 50 ? 1000 : 5000);
        return a && fc.value >= 1000 ? null : { validateAmount: true };
      }),
      first(),
    );
  }

  onSubmit() {
    let order: any;
    let reason: string = null;
    if (this.reasonFormControl) {
      const otherReason: string = this.otherReasonFormControl && this.otherReasonFormControl.value;
      reason = otherReason || this.reasonFormControl.value;
    }
    if (this.fullWithdrawControl.value) {
      // const otherReason: string = this.otherReasonFormControl && this.otherReasonFormControl.value;
      // const reason: string = otherReason || this.reasonFormControl.value;
      order = {
        orderType: this.orderTypeEnum.fullWithdrawal,
        reason,
      };
    } else {
      order = {
        orderType: this.orderTypeEnum.withdrawal,
        amount: this.amountFormControl.value,
        reason,
      };
    }
    this.orderService.createOrder(order);
  }
}
