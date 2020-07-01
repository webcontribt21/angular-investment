import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ConfigService, I18nService, ProductsService } from '../../../core/services';
import { Allocation, AssetRegion } from '../../../core/models';
import { ClassColorsEnum, RegionColorsEnum } from '../../../main/overview/investment/class-colors.enum';
import { LanguagesEnum } from '../../../core/enums/i18n.enum';
import { AssetMapData } from './interfaces/asset-map-data.interface';
import { AssetGrouped } from './interfaces/asset-grouped.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { roundObject } from '../../utils';

interface ExtraMapData {
  posTop: string;
  posRight: string;
}

@Component({
  selector: 'app-asset-map',
  templateUrl: './asset-map.component.html',
  styleUrls: ['./asset-map.component.scss'],
})
export class AssetMapComponent implements OnInit {
  @Input()
  allocation$: Observable<Allocation[]> = null;

  regions$: Observable<string[]>;

  private assetRegions: Map<string, [AssetRegion, number]> = new Map();

  private DATA = new Map<string, ExtraMapData>([
    [
      'AFRICA_MIDDLE_EAST',
      {
        posTop: '59.8%',
        posRight: '47.4%',
      },
    ],
    [
      'EUROPE',
      {
        posTop: '29.9%',
        posRight: '46.9%',
      },
    ],
    [
      'LATIN_AMERICA',
      {
        posTop: '69.4%',
        posRight: '70.9%',
      },
    ],
    [
      'NORTH_AMERICA',
      {
        posTop: '33.6%',
        posRight: '82.3%',
      },
    ],
    [
      'OCEANIA',
      {
        posTop: '80.8%',
        posRight: '14.4%',
      },
    ],
    [
      'RUSSIA_CENTRAL_ASIA',
      {
        posTop: '27.8%',
        posRight: '26.4%',
      },
    ],
    [
      'SOUTH_EAST_ASIA',
      {
        posTop: '47.5%',
        posRight: '24.1%',
      },
    ],
  ]);

  constructor(
    public sanitizer: DomSanitizer,
    private configService: ConfigService,
    private productsService: ProductsService,
    private i18nService: I18nService,
  ) {}

  ngOnInit() {
    this.regions$ = this.i18nService.selectedLang$.pipe(
      switchMap((selectedLang: LanguagesEnum) => {
        return this.allocation$.pipe(
          this.productsService.getExtendedAllocation(),
          withLatestFrom(this.configService.assetRegions$),
          map(([extendedAllocation, regions]) => {
            let assetRegions: Map<string, [AssetRegion, number]> = new Map();
            extendedAllocation.forEach(allocation => {
              const security = allocation.security;
              const strategySecurityRatio = allocation.ratio;
              Object.keys(security.assetRegions).forEach(regionKey => {
                const region = regions.find(x => x.code === regionKey);
                const securityRegionRatio = security.assetRegions[region.code];
                const ratio = strategySecurityRatio * securityRegionRatio;
                const prevRatio = assetRegions.has(region.code) ? assetRegions.get(region.code)[1] : 0;
                assetRegions.set(region.code, [region, ratio + prevRatio]);
              });
            });
            assetRegions = new Map(
              roundObject(
                Array.from(assetRegions.entries()),
                ([rc, [r, v]]) => v,
                ([rc, [r, ov]], v) => [rc, [r, v]] as [string, [AssetRegion, number]],
              ),
            );
            this.assetRegions = assetRegions;
            return Array.from(assetRegions.keys());
          }),
        );
      }),
    );
  }

  get(code: string) {
    const pair = this.assetRegions.get(code);
    const data = this.DATA.get(code);
    const rgb = this.hexToRGB(RegionColorsEnum[code] || RegionColorsEnum.DEFAULT);
    return {
      label: pair[0].label,
      ratio: pair[1],
      untrusted:
        '--size: ' +
        (pair[1] * 80 + 15) +
        'px; --posTop: ' +
        data.posTop +
        '; --posRight: ' +
        data.posRight +
        '; --colorR: ' +
        rgb.r +
        '; --colorG: ' +
        rgb.g +
        '; --colorB: ' +
        rgb.b,
    };
  }

  private hexToRGB(color: string) {
    return {
      r: parseInt(color.slice(1, 3), 16),
      g: parseInt(color.slice(3, 5), 16),
      b: parseInt(color.slice(5, 7), 16),
    };
  }
}
