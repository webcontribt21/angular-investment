import * as Highcharts from 'highcharts';
import { Security } from './security.model';

export class AssetCategorized {
  amount: number;
  ratio: number;
  name: string;
  isin: string;
  description: string;
  color: Highcharts.ColorType;
  assetCategory: string;
  assetClass: string;
  assetLabel: string;
  security: Security;
}
