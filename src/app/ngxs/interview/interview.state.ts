import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';

import { Interview, RiskProfile } from '../../core/models';
import { InvestmentStrategyEnum } from '../../core/enums/investment-strategy.enum';
import { InterviewExperienceStatus } from '../../core/enums/experience-status.enum';
import { NgxsForm } from '../interfaces/ngxs-form.model';

import { InterviewsPostRequestAction } from '../requests/interview/interviews-post/interviews-post-request.actions';
import {
  ClearSelectedInterviewAction,
  ClearSelectedInvestmentStrategyAction,
  NextInterviewStepAction,
  PrevInterviewStepAction,
  ResetInterviewStepAction,
  SaveInterviewAction,
  SaveInterviewSuccessAction,
  SelectInvestmentStrategyAction,
} from './interview.actions';
import { LoadPerformanceProjectionsAction } from '../config/config.actions';
import { Navigate } from '@ngxs/router-plugin';
import { Injectable } from '@angular/core';

export interface InterviewStateModel {
  entities: { [key: string]: Interview };
  ids: string[];
  selectedInterviewId: string;
  selectedInvestmentStrategy: InvestmentStrategyEnum;
  interviewStep: number;
  insufficientExperience: InterviewExperienceStatus;
  addInterviewForm: NgxsForm;
}

@State<InterviewStateModel>({
  name: 'interview',
  defaults: {
    entities: {},
    ids: [],
    selectedInterviewId: null,
    selectedInvestmentStrategy: null,
    addInterviewForm: new NgxsForm(),
    insufficientExperience: InterviewExperienceStatus.Default,
    interviewStep: 1,
  },
})
@Injectable()
export class InterviewState implements NgxsOnInit {
  constructor(private store: Store) {}

  ngxsOnInit(ctx: StateContext<InterviewStateModel>) {}

  @Action(SaveInterviewAction)
  saveInterview(ctx: StateContext<InterviewStateModel>, action: SaveInterviewAction) {
    const interview = action.payload || ctx.getState().addInterviewForm.model;
    ctx.dispatch(new InterviewsPostRequestAction(interview));
  }

  @Action(SaveInterviewSuccessAction)
  saveInterviewSuccess(ctx: StateContext<InterviewStateModel>, action: SaveInterviewSuccessAction) {
    const interview = new Interview(action.payload);
    ctx.patchState({
      ids: [...ctx.getState().ids, interview.id],
      entities: {
        ...ctx.getState().entities,
        [interview.id]: interview,
      },
      selectedInterviewId: interview.id,
    });

    if (!interview.riskProfile) {
      ctx.dispatch(new Navigate(['/', 'orders', 'new', 'update-strategy', 'insufficient-experience']));
      return;
    }

    // select highest investment strategy of current risk profile
    const riskProfiles: RiskProfile[] = this.store.selectSnapshot(state => state.config.riskProfiles);
    const riskProfile: RiskProfile = riskProfiles.find(risk => risk.code === interview.riskProfile);
    const possibleStrategies: InvestmentStrategyEnum[] = riskProfile.acceptableInvestmentStrategies;
    const highestStrategy: InvestmentStrategyEnum = possibleStrategies[possibleStrategies.length - 1];
    ctx.dispatch(new SelectInvestmentStrategyAction(highestStrategy));
  }

  @Action(NextInterviewStepAction)
  nextInterviewStep(ctx: StateContext<InterviewStateModel>, action: NextInterviewStepAction) {
    if (action.payload && action.payload.insufficientExperience) {
      switch (action.payload.insufficientExperience) {
        case InterviewExperienceStatus.Requested:
          if (ctx.getState().insufficientExperience === InterviewExperienceStatus.WillAcquire) {
            ctx.patchState({
              insufficientExperience: InterviewExperienceStatus.WillAcquire,
              interviewStep: ctx.getState().interviewStep + 1,
            });
          } else {
            ctx.patchState({
              insufficientExperience: InterviewExperienceStatus.Requested,
            });
          }
          break;
        case InterviewExperienceStatus.WillAcquire:
          ctx.patchState({
            insufficientExperience: InterviewExperienceStatus.WillAcquire,
            interviewStep: ctx.getState().interviewStep + 1,
          });
          break;
        case InterviewExperienceStatus.WontAcquire:
          ctx.dispatch(new Navigate(['/', 'orders']));
          break;
        default:
          ctx.patchState({
            interviewStep: ctx.getState().interviewStep + 1,
          });
      }
    } else {
      ctx.patchState({
        interviewStep: ctx.getState().interviewStep + 1,
      });
    }
  }

  @Action(PrevInterviewStepAction)
  prevInterviewStep(ctx: StateContext<InterviewStateModel>, action: PrevInterviewStepAction) {
    if (ctx.getState().insufficientExperience === InterviewExperienceStatus.Requested) {
      ctx.patchState({
        insufficientExperience: InterviewExperienceStatus.Default,
      });
    } else {
      ctx.patchState({
        interviewStep: ctx.getState().interviewStep - 1,
      });
    }
  }

  @Action(ResetInterviewStepAction)
  resetInterviewStep(ctx: StateContext<InterviewStateModel>, action: ResetInterviewStepAction) {
    ctx.patchState({
      interviewStep: 1,
      insufficientExperience: InterviewExperienceStatus.Default,
    });
  }

  @Action(ClearSelectedInterviewAction)
  clearSelectedInterview(ctx: StateContext<InterviewStateModel>, action: ClearSelectedInterviewAction) {
    ctx.patchState({
      selectedInterviewId: null,
    });
  }

  @Action(SelectInvestmentStrategyAction)
  selectInvestmentStrategy(ctx: StateContext<InterviewStateModel>, action: SelectInvestmentStrategyAction) {
    ctx.patchState({
      selectedInvestmentStrategy: action.payload,
    });
    ctx.dispatch(new LoadPerformanceProjectionsAction(action.payload));
  }

  @Action(ClearSelectedInvestmentStrategyAction)
  clearSelectedInvestmentStrategy(ctx: StateContext<InterviewStateModel>, action: ClearSelectedInvestmentStrategyAction) {
    ctx.patchState({
      selectedInvestmentStrategy: null,
    });
  }
}
