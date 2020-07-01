import { NgModule } from '@angular/core';

import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { OrderSummaryModule } from '../order-summary/order-summary.module';

import { InterviewRoutingModule } from './interview-routing.module';
import { InterviewComponent } from './interview.component';
import { AppSharedModule } from '../../../../../shared/shared.module';
import { Question1Module } from './question-1/question-1.module';
import { Question2Module } from './question-2/question-2.module';
import { Question3Module } from './question-3/question-3.module';
import { Question4Module } from './question-4/question-4.module';
import { Question5Module } from './question-5/question-5.module';
import { Question6Module } from './question-6/question-6.module';
import { InsufficientExperienceModule } from '../insufficient-experience/insufficient-experience.module';

@NgModule({
  declarations: [InterviewComponent],
  imports: [
    AppSharedModule,
    InterviewRoutingModule,
    NgxsFormPluginModule,
    Question1Module,
    Question2Module,
    Question3Module,
    Question4Module,
    Question5Module,
    Question6Module,
    InsufficientExperienceModule,
    OrderSummaryModule,
  ],
})
export class InterviewModule {}
