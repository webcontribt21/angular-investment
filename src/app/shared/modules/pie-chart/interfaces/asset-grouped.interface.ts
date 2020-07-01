import * as Highcharts from 'highcharts';

export interface AssetGrouped {
  amount: number;
  ratio: number;
  color: Highcharts.ColorType;
  assetClass: string;
  classCode: string;
}
