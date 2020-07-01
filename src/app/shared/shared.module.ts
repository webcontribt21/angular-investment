import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SliderModule } from 'primeng/slider';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

import { MODULES } from './modules';
import { LetDirectiveModule } from './directives/let-directive/let-directive.module';
import { TelInputModule } from './directives/tel-input/tel-input.module';
import { CurrencySignPipeModule } from './pipes/currency-sign-pipe/currency-sign-pipe.module';
import { DurationPipeModule } from './pipes/duration-pipe/duration-pipe.module';
import { PercentPipeModule } from './pipes/percent-pipe/percent-pipe.module';
import { CustomTranslatePipeModule } from './pipes/custom-translate-pipe/custom-translate-pipe.module';
import { DatePipeModule } from './pipes/date-pipe/date-pipe.module';
import { KeyFilterPipeModule } from './pipes/key-filter-pipe/key-filter-pipe.module';

const primeModules = [
  SharedModule,
  InputTextModule,
  OverlayPanelModule,
  InputSwitchModule,
  CheckboxModule,
  ToastModule,
  SidebarModule,
  DropdownModule,
  SelectButtonModule,
  TableModule,
  ButtonModule,
  MenuModule,
  ProgressSpinnerModule,
  SliderModule,
  TabViewModule,
  RadioButtonModule,
  InputMaskModule,
  VirtualScrollerModule,
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    TranslateModule,
    CurrencySignPipeModule,
    DatePipeModule,
    DurationPipeModule,
    PercentPipeModule,
    KeyFilterPipeModule,
    LetDirectiveModule,
    TelInputModule,
    CustomTranslatePipeModule,
    ClipboardModule,

    ...primeModules,
    ...MODULES,
  ],
})
export class AppSharedModule {}
