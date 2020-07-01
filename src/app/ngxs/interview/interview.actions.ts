import { InvestmentStrategyEnum } from '../../core/enums/investment-strategy.enum';
import { InterviewExperienceStatus } from 'src/app/core/enums/experience-status.enum';

export const ActionTypes = {
  SAVE_INTERVIEW: '[Interview] Save Interview',
  SAVE_INTERVIEW_SUCCESS: '[Interview] Save Interview Success',
  SAVE_INTERVIEW_FAIL: '[Interview] Save Interview Fail',

  NEXT_INTERVIEW_STEP: '[Interview] Next Interview Step',
  PREV_INTERVIEW_STEP: '[Interview] Prev Interview Step',
  RESET_INTERVIEW_STEP: '[Interview] Reset Interview Step',

  CLEAR_SELECTED_INTERVIEW: '[Interview] Clear Selected Interview',

  SELECT_INVESTMENT_STRATEGY: '[Interview] Select Investment Strategy',
  CLEAR_SELECTED_INVESTMENT_STRATEGY: '[Interview] Clear Selected Investment Strategy',
};

export class SaveInterviewAction {
  static type = ActionTypes.SAVE_INTERVIEW;

  constructor(public payload?: any) {}
}
export class SaveInterviewSuccessAction {
  static type = ActionTypes.SAVE_INTERVIEW_SUCCESS;

  constructor(public payload: any) {}
}
export class SaveInterviewFailAction {
  static type = ActionTypes.SAVE_INTERVIEW_FAIL;

  constructor(public payload: any) {}
}

export interface NextInterviewStepActionPayload {
  insufficientExperience: InterviewExperienceStatus;
}
export class NextInterviewStepAction {
  static type = ActionTypes.NEXT_INTERVIEW_STEP;

  constructor(public payload?: NextInterviewStepActionPayload) {}
}
export class PrevInterviewStepAction {
  static type = ActionTypes.PREV_INTERVIEW_STEP;

  constructor(public payload?: any) {}
}
export class ResetInterviewStepAction {
  static type = ActionTypes.RESET_INTERVIEW_STEP;

  constructor(public payload?: any) {}
}

export class ClearSelectedInterviewAction {
  static type = ActionTypes.CLEAR_SELECTED_INTERVIEW;

  constructor(public payload?: any) {}
}

export class SelectInvestmentStrategyAction {
  static type = ActionTypes.SELECT_INVESTMENT_STRATEGY;

  constructor(public payload: InvestmentStrategyEnum) {}
}
export class ClearSelectedInvestmentStrategyAction {
  static type = ActionTypes.CLEAR_SELECTED_INVESTMENT_STRATEGY;

  constructor(public payload?: any) {}
}
