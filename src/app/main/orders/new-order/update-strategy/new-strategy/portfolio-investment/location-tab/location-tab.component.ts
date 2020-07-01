import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, map, pluck, withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';

import { Allocation, AssetRegion, Security } from '../../../../../../../core/models';
import { ApplicationService, ConfigService, InterviewService } from '../../../../../../../core/services';
import { ProductsDetailedTableModalComponent } from '../../../../../../../shared/modals/products-detailed-table-modal/products-detailed-table-modal.component';

@Component({
  selector: 'app-location-tab',
  templateUrl: './location-tab.component.html',
  styleUrls: ['./location-tab.component.scss'],
})
export class LocationTabComponent implements OnInit {
  regions$: Observable<{ assetRegion: AssetRegion; value: number; color: string; position: { top: number; right: number } }[]>;

  colors: { [key: string]: string } = {
    AFRICA_MIDDLE_EAST: '#1DA379',
    EUROPE: '#FFACAC',
    LATIN_AMERICA: '#FEC678',
    NORTH_AMERICA: '#4DA8CF',
    OCEANIA: '#B4A0FF',
    RUSSIA_CENTRAL_ASIA: '#FFE570',
    SOUTH_EAST_ASIA: '#B3DAEB',
  };

  positions: { [key: string]: { top: number; right: number } } = {
    AFRICA_MIDDLE_EAST: { top: 59.8, right: 47.4 },
    EUROPE: { top: 29.9, right: 46.9 },
    LATIN_AMERICA: { top: 69.4, right: 70.9 },
    NORTH_AMERICA: { top: 33.6, right: 82.3 },
    OCEANIA: { top: 80.8, right: 14.4 },
    RUSSIA_CENTRAL_ASIA: { top: 27.8, right: 26.4 },
    SOUTH_EAST_ASIA: { top: 47.5, right: 24.1 },
  };

  constructor(
    private configService: ConfigService,
    private interviewService: InterviewService,
    private applicationService: ApplicationService,
  ) {}

  ngOnInit() {
    this.regions$ = this.interviewService.selectedStrategy$.pipe(
      filter(res => !!res),
      pluck('allocations'),
      withLatestFrom(this.configService.securities$, this.configService.assetRegions$),
      map(([allocations, securities, regions]) => {
        let sum = 0;
        const locations = allocations.reduce((acc, alloc: Allocation) => {
          const currentSecurity: Security = securities.find(sec => sec.code === alloc.security);
          if (!currentSecurity.assetRegions || !currentSecurity.assetRegions.length) {
            _.forEach(currentSecurity.assetRegions, (value, key) => {
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
        const maxRegion: string = Object.keys(locations).sort((a, b) => locations[b] - locations[a])[0];
        locations[maxRegion] = this.roundValue(locations[maxRegion] + sumToAdd);

        return _.map(locations, (value, key) => {
          return {
            assetRegion: regions.find(region => region.code === key),
            color: this.colors[key],
            position: this.positions[key],
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
