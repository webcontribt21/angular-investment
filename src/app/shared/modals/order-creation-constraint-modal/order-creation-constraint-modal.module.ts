import { NgModule } from '@angular/core';

import { OrderCreationConstraintModalComponent } from './order-creation-constraint-modal.component';
import { AppSharedModule } from '../../shared.module';

@NgModule({
  declarations: [OrderCreationConstraintModalComponent],
  imports: [AppSharedModule],
  exports: [OrderCreationConstraintModalComponent],
  entryComponents: [OrderCreationConstraintModalComponent],
})
export class OrderCreationConstraintModalModule {}
