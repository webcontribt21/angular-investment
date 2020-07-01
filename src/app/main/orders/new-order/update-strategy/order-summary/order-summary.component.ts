import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { StrategyToDisplay } from '../../../../../core/models';
import { CustomerService, InterviewService } from '../../../../../core/services';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  strategyToDisplay$: Observable<StrategyToDisplay>;
  selectedStrategyToDisplay$: Observable<StrategyToDisplay>;

  constructor(private customerService: CustomerService, private interviewService: InterviewService) {}

  ngOnInit() {
    this.strategyToDisplay$ = this.customerService.strategyToDisplay$;
    this.selectedStrategyToDisplay$ = this.interviewService.selectedStrategyToDisplay$;
  }
}
