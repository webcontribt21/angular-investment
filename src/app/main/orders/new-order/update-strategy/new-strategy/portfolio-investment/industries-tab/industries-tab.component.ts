import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, map, pluck, withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';

import { ApplicationService, ConfigService, InterviewService } from '../../../../../../../core/services';
import { Allocation, AssetIndustry, Security } from '../../../../../../../core/models';
import { ProductsDetailedTableModalComponent } from '../../../../../../../shared/modals/products-detailed-table-modal/products-detailed-table-modal.component';

@Component({
  selector: 'app-industries-tab',
  templateUrl: './industries-tab.component.html',
  styleUrls: ['./industries-tab.component.scss'],
})
export class IndustriesTabComponent implements OnInit {
  industries$: Observable<{ assetIndustry: AssetIndustry; value: number; color: string }[]>;

  colors: { [key: string]: string } = {
    COMMODITIES: '#4da8cf',
    COMMUNICATION_SERVICES: '#FEC678',
    CONSUMER_DISCRETIONARY: '#1da379',
    CONSUMER_STAPLES: '#ffe570',
    ENERGY: '#fec678',
    FINANCIAL: '#ef9200',
    HEALTH_CARE: '#b3daeb',
    INDUSTRY: '#feb5b6',
    INFORMATION_TECHNOLOGY: '#afedc8',
    MATERIALS: '#b4a0ff',
    REAL_ESTATE: '#e28acc',
    SOVEREIGN_DEBT: '#FFACAC',
    UTILITIES: '#ef9200',
    DEFAULT: '#B4A0FF',
  };

  constructor(
    private configService: ConfigService,
    private interviewService: InterviewService,
    private applicationService: ApplicationService,
  ) {}

  ngOnInit() {
    this.industries$ = this.interviewService.selectedStrategy$.pipe(
      filter(res => !!res),
      pluck('allocations'),
      withLatestFrom(this.configService.securities$, this.configService.assetIndustries$),
      map(([allocations, securities, industries]) => {
        let sum = 0;
        const industriesObj = allocations.reduce((acc, alloc: Allocation) => {
          const currentSecurity: Security = securities.find(sec => sec.code === alloc.security);
          if (!currentSecurity.assetIndustries || !currentSecurity.assetIndustries.length) {
            _.forEach(currentSecurity.assetIndustries, (value, key) => {
              acc[key] = acc[key] || 0;
              const addedValue: number = this.roundValue(value * alloc.ratio);
              acc[key] += addedValue;
              sum += addedValue;
            });
          }
          return acc;
        }, {});

        // add sum to max industry value so the sum of all values is 100%
        const sumToAdd: number = 1 - sum;
        const maxIndustry: string = Object.keys(industriesObj).sort((a, b) => industriesObj[b] - industriesObj[a])[0];
        industriesObj[maxIndustry] = this.roundValue(industriesObj[maxIndustry] + sumToAdd);

        return _.map(industriesObj, (value, key) => {
          return {
            assetIndustry: industries.find(industry => industry.code === key),
            color: this.colors[key],
            value: this.roundValue(value),
          };
        });
      }),
    );
  }

  roundValue(val: number): number {
    return _.round(val, 4);
  }

  openTableModal() {
    this.applicationService.openModal(ProductsDetailedTableModalComponent, {
      styleClass: 'products-table-modal products-table',
    });
  }
}
