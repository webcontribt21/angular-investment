import { Selector } from '@ngxs/store';

import { InterviewState, InterviewStateModel } from './interview.state';
import { Interview } from '../../core/models';
import { InvestmentStrategyEnum } from '../../core/enums/investment-strategy.enum';
import { InterviewExperienceStatus } from '../../core/enums/experience-status.enum';
import { NgxsForm } from '../interfaces/ngxs-form.model';

export class InterviewGetterState {
  @Selector([InterviewState])
  static getSelectedInterview(state: InterviewStateModel): Interview {
    return state.entities[state.selectedInterviewId];
  }

  @Selector([InterviewState])
  static getInterviewStep(state: InterviewStateModel): number {
    return state.interviewStep;
  }

  @Selector([InterviewState])
  static getInsufficientExperience(state: InterviewStateModel): InterviewExperienceStatus {
    return state.insufficientExperience;
  }

  @Selector([InterviewState])
  static getSelectedInvestmentStrategy(state: InterviewStateModel): InvestmentStrategyEnum {
    return state.selectedInvestmentStrategy;
  }

  @Selector([InterviewState])
  static getAddInterviewForm(state: InterviewStateModel): NgxsForm {
    return state.addInterviewForm;
  }
}
