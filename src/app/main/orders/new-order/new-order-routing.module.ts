import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOrderComponent } from './new-order.component';
import { NewOrderGuard } from '../../../core/guards/new-order.guard';
import { OrderTypeEnum } from '../../../core/enums/order-type.enum';

const routes: Routes = [
  {
    path: '',
    component: NewOrderComponent,
    children: [
      {
        path: 'deposit',
        loadChildren: () => import('./deposit/deposit.module').then(m => m.DepositModule),
        data: {
          orderType: OrderTypeEnum.deposit,
        },
      },
      {
        path: 'withdrawal',
        loadChildren: () => import('./withdrawal/withdrawal.module').then(m => m.WithdrawalModule),
        data: {
          orderType: OrderTypeEnum.withdrawal,
        },
      },
      {
        path: 'monthly',
        loadChildren: () => import('./monthly/monthly.module').then(m => m.MonthlyModule),
        data: {
          orderType: OrderTypeEnum.recurringDepositChange,
        },
      },
      {
        path: 'update-strategy',
        loadChildren: () => import('./update-strategy/update-strategy.module').then(m => m.UpdateStrategyModule),
        data: {
          orderType: OrderTypeEnum.strategyChange,
        },
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
        data: {
          orderType: OrderTypeEnum.addressChange,
        },
      },
      {
        path: 'reference-account',
        loadChildren: () => import('./reference-account/reference-account.module').then(m => m.ReferenceAccountModule),
        data: {
          orderType: OrderTypeEnum.referenceAccountChange,
        },
      },
      {
        path: 'tax-exemption',
        loadChildren: () => import('./tax-exemption/tax-exemption.module').then(m => m.TaxExemptionModule),
        data: {
          orderType: OrderTypeEnum.taxExemption,
        },
      },
    ],
    canActivateChild: [NewOrderGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOrderRoutingModule {}
