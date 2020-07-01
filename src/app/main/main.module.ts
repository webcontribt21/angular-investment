import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { AppSharedModule } from '../shared/shared.module';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';

@NgModule({
  declarations: [MainComponent],
  imports: [MainRoutingModule, AppSharedModule, HeaderModule, FooterModule],
  providers: [],
})
export class MainModule {}
