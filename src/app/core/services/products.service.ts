import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as Highcharts from 'highcharts';

import { ApplicationService } from './application.service';
import { ConfigService } from './config.service';
import { I18nService } from './i18n.service';
import { Allocation, AssetCategorized, AssetClass, AssetLabel, Security } from '../models';
import { ClassColorsEnum } from '../../main/overview/investment/class-colors.enum';
import { LanguagesEnum } from '../enums/i18n.enum';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private appService: ApplicationService, private configService: ConfigService, private i18nService: I18nService) {}

  getExtendedAllocation() {
    return (allocation$: Observable<Allocation[]>) => {
      return allocation$.pipe(
        withLatestFrom(this.configService.securities$, this.configService.assetLabels$, this.configService.assetClasses$),
        map(([allocation, securities, assetLabels, assetClasses]) => {
          // extend allocation data with its asset label and asset class
          const extendedAllocation = allocation.map(res => {
            const currentSecurity: Security = securities.find(sec => {
              return sec.code === res.security;
            });
            const currentAssetLabel: AssetLabel = assetLabels.find(al => {
              return al.code === currentSecurity.assetLabel;
            });
            const currentAssetClass: AssetClass = assetClasses.find(ac => {
              return ac.code === currentSecurity.assetClass;
            });
            return {
              ...res,
              assetLabel: currentAssetLabel,
              assetClass: currentAssetClass,
              security: currentSecurity,
            };
          });
          return extendedAllocation;
        }),
      );
    };
  }

  getProducts(allocation$: Observable<Allocation[]>): Observable<AssetCategorized[]> {
    return this.i18nService.selectedLang$.pipe(
      switchMap((selectedLang: LanguagesEnum) => {
        return allocation$.pipe(
          this.getExtendedAllocation(),
          map((extendedAllocation: any) => {
            const buildObj: {
              totalAmount: number;
              assetsCategorized: { [key: string]: AssetCategorized };
            } = extendedAllocation.reduce(
              (acc, loc) => {
                const currentAssetLabel: AssetLabel = loc.assetLabel;
                const currentSecurity: Security = loc.security;
                const currentAssetClass: AssetClass = loc.assetClass;

                acc.totalAmount += loc.amount;

                if (acc.assetsCategorized[currentAssetLabel.code]) {
                  acc.assetsCategorized[currentAssetLabel.code].amount += loc.amount;
                  acc.assetsCategorized[currentAssetLabel.code].ratio += loc.ratio;
                } else {
                  acc.assetsCategorized[currentAssetLabel.code] = {
                    name: currentSecurity.name,
                    isin: currentSecurity.code,
                    amount: loc.amount,
                    ratio: loc.ratio,
                    assetLabel: currentSecurity.name,
                    assetClass: currentAssetClass.label[selectedLang],
                    color: new Highcharts.Color(ClassColorsEnum[currentAssetClass.code] || ClassColorsEnum.DEFAULT).get(),
                    description: currentSecurity.label[selectedLang],
                    assetCategory: currentAssetLabel.label[selectedLang],
                    security: currentSecurity,
                  };
                }

                return acc;
              },
              { totalAmount: 0, assetsCategorized: {} },
            );

            return Object.values(buildObj.assetsCategorized)
              .sort((a, b) => b.amount - a.amount)
              .sort((a, b) => {
                // sort by asset class
                const sumA = Object.values(buildObj.assetsCategorized)
                  .filter(x => x.assetClass === a.assetClass)
                  .reduce((p, c) => p + c.amount, 0);
                const sumB = Object.values(buildObj.assetsCategorized)
                  .filter(x => x.assetClass === b.assetClass)
                  .reduce((p, c) => p + c.amount, 0);
                return sumB - sumA;
              });
          }),
        );
      }),
    );
  }
}
