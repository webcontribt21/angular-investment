import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule),
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
      },
      {
        path: 'documents',
        loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./user-settings/user-settings.module').then(m => m.UserSettingsModule),
      },
      {
        path: 'account-details',
        loadChildren: () => import('./account-details/account-details.module').then(m => m.AccountDetailsModule),
      },
      {
        path: 'invite-friends',
        loadChildren: () => import('./invite-friends/invite-friends.module').then(m => m.InviteFriendsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
