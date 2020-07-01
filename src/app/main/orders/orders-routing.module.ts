import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./all-orders/all-orders.module').then(m => m.AllOrdersModule),
      },
      {
        path: 'new',
        loadChildren: () => import('./new-order/new-order.module').then(m => m.NewOrderModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
