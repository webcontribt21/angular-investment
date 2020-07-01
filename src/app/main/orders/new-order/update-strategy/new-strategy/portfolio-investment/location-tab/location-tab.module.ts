import { NgModule } from '@angular/core';

import { LocationTabComponent } from './location-tab.component';
import { AppSharedModule } from '../../../../../../../shared/shared.module';

@NgModule({
  declarations: [LocationTabComponent],
  imports: [AppSharedModule],
  exports: [LocationTabComponent],
})
export class LocationTabModule {}
