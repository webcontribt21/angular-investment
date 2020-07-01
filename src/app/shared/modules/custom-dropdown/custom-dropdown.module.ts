import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';

import { CustomDropdownComponent } from './custom-dropdown.component';

@NgModule({
  declarations: [CustomDropdownComponent],
  imports: [CommonModule, FormsModule, DropdownModule],
  exports: [CustomDropdownComponent],
})
export class CustomDropdownModule {}
