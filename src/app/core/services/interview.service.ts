import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { Interview, InvestmentStrategy, StrategyToDisplay } from '../models';
import { InvestmentStrategyEnum } from '../enums/investment-strategy.enum';
import { InterviewExperienceStatus } from '../enums/experience-status.enum';
import { ConfigService } from './config.service';

import {
  ClearSelectedInterviewAction,
  ClearSelectedInvestmentStrategyAction,
  NextInterviewStepAction,
  PrevInterviewStepAction,
  ResetInterviewStepAction,
  SaveInterviewAction,
  SelectInvestmentStrategyAction,
  NextInterviewStepActionPayload,
} from '../../ngxs/interview/interview.actions';
import { InterviewGetterState } from '../../ngxs/interview';
import { NgxsForm } from '../../ngxs/interfaces/ngxs-form.model';

export const QUESTIONS_DATA = new InjectionToken<string>('app.questionsData');

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  @Select(InterviewGetterState.getSelectedInterview)
  selectedInterview$: Observable<Interview>;

  @Select(InterviewGetterState.getInterviewStep)
  interviewStep$: Observable<number>;

  @Select(InterviewGetterState.getInsufficientExperience)
  insufficientExperience$: Observable<InterviewExperienceStatus>;

  @Select(InterviewGetterState.getSelectedInvestmentStrategy)
  selectedInvestmentStrategy$: Observable<InvestmentStrategyEnum>;

  @Select(InterviewGetterState.getAddInterviewForm)
  addInterviewForm$: Observable<NgxsForm>;

  selectedStrategy$: Observable<InvestmentStrategy> = this.selectedInvestmentStrategy$.pipe(this.configService.getStrategyByCode());

  selectedStrategyToDisplay$: Observable<StrategyToDisplay> = this.selectedStrategy$.pipe(this.configService.strategyToDisplay());

  constructor(private store: Store, private httpClient: HttpClient, private configService: ConfigService) {}

  saveInterview() {
    this.store.dispatch(new SaveInterviewAction());
  }

  saveInterviewRequest(interview) {
    return this.httpClient.post('interviews/v2/', interview);
  }

  nextInterviewStep(payload?: NextInterviewStepActionPayload) {
    this.store.dispatch(new NextInterviewStepAction(payload));
  }

  prevInterviewStep() {
    this.store.dispatch(new PrevInterviewStepAction());
  }

  resetInterviewStep() {
    this.store.dispatch(new ResetInterviewStepAction());
  }

  clearSelectedInterview() {
    this.store.dispatch(new ClearSelectedInterviewAction());
  }

  selectInvestmentStrategy(strategy: InvestmentStrategyEnum) {
    this.store.dispatch(new SelectInvestmentStrategyAction(strategy));
  }

  clearSelectedInvestmentStrategy() {
    this.store.dispatch(new ClearSelectedInvestmentStrategyAction());
  }
}
