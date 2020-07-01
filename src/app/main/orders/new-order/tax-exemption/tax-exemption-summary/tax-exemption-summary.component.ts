import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { ConfigService, OrderService } from '../../../../../core/services';
import { Title } from '../../../../../core/models';

@Component({
  selector: 'app-tax-exemption-summary',
  templateUrl: './tax-exemption-summary.component.html',
  styleUrls: ['./tax-exemption-summary.component.scss'],
})
export class TaxExemptionSummaryComponent implements OnInit {
  taxForm$: Observable<any>;
  title$: Observable<Title>;

  constructor(private orderService: OrderService, private configService: ConfigService) {}

  ngOnInit() {
    this.taxForm$ = this.orderService.taxExemptionFormValue$.pipe(map(taxForm => taxForm.model));

    this.title$ = this.taxForm$.pipe(
      withLatestFrom(this.configService.titles$),
      map(([taxForm, titles]: [any, Title[]]) => {
        const currentTitle = titles.find(title => {
          return title.code === taxForm.spouse.title;
        });
        return currentTitle;
      }),
    );
  }
}
