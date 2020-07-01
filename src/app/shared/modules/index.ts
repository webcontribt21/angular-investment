import { CustomDropdownModule } from './custom-dropdown/custom-dropdown.module';
import { PaginationModule } from './pagination/pagination.module';
import { PieChartModule } from './pie-chart/pie-chart.module';
import { StockChartModule } from './stock-chart/stock-chart.module';
import { BackButtonModule } from './back-button/back-button.module';
import { UploadButtonModule } from './upload-button/upload-button.module';
import { CurrencyInputModule } from './currency-input/currency-input.module';
import { AssetMapModule } from './asset-map/asset-map.module';

export const MODULES = [
  CustomDropdownModule,
  PaginationModule,
  AssetMapModule,
  PieChartModule,
  StockChartModule,
  BackButtonModule,
  UploadButtonModule,
  CurrencyInputModule,
];
