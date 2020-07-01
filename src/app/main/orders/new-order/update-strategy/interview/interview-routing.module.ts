import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterviewComponent } from './interview.component';
import { InterviewQuestionsResolver } from '../../../../../core/resolvers/interview-questions.resolver';
import { InterviewAnswersResolver } from '../../../../../core/resolvers/interview-answers.resolver';
import { InvestmentStrategiesResolver } from '../../../../../core/resolvers/investment-strategies.resolver';

const routes: Routes = [
  {
    path: '',
    component: InterviewComponent,
    resolve: {
      interviewQuestions: InterviewQuestionsResolver,
      interviewAnswers: InterviewAnswersResolver,
      investmentStrategies: InvestmentStrategiesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewRoutingModule {}
