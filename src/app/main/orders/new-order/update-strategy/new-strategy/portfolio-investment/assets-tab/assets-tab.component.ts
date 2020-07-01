import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';

import { ApplicationService, InterviewService } from '../../../../../../../core/services';
import { Allocation } from '../../../../../../../core/models';
import { ProductsDetailedTableModalComponent } from '../../../../../../../shared/modals/products-detailed-table-modal/products-detailed-table-modal.component';

@Component({
  selector: 'app-assets-tab',
  templateUrl: './assets-tab.component.html',
  styleUrls: ['./assets-tab.component.scss'],
})
export class AssetsTabComponent implements OnInit {
  allocation$: Observable<Allocation[]>;

  constructor(private interviewService: InterviewService, private applicationService: ApplicationService) {}

  ngOnInit() {
    this.allocation$ = this.interviewService.selectedStrategy$.pipe(
      filter(res => !!res),
      pluck('allocations'),
    );
  }

  openTableModal() {
    this.applicationService.openModal(ProductsDetailedTableModalComponent, {
      styleClass: 'products-table-modal products-table',
    });
  }
}
