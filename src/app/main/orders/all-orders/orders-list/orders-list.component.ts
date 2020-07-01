import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Order, Pagination } from '../../../../core/models';
import { OrderService } from '../../../../core/services';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent {
  orders$: Observable<Order[]> = this.orderService.orders$;
  ordersPagination$: Observable<Pagination> = this.orderService.ordersPagination$;

  constructor(private orderService: OrderService) {}

  onPageChanged(newOffset: number) {
    this.orderService.loadOrders(newOffset);
  }

  trackByFn(index, item) {
    return item.id;
  }
}
