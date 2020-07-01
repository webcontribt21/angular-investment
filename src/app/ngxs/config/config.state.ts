import { Action, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import {
  LoadSecuritiesAction,
  LoadSecuritiesSuccessAction,
  LoadAssetClassesAction,
  LoadAssetClassesSuccessAction,
  LoadAssetLabelsAction,
  LoadAssetLabelsSuccessAction,
  LoadInvestmentStrategiesAction,
  LoadInvestmentStrategiesSuccessAction,
  LoadTransactionCategoriesAction,
  LoadTransactionCategoriesSuccessAction,
  LoadInboxDocumentCategoriesAction,
  LoadInboxDocumentCategoriesSuccessAction,
  LoadInterviewQuestionsAction,
  LoadInterviewQuestionsSuccessAction,
  LoadInterviewAnswersAction,
  LoadInterviewAnswersSuccessAction,
  LoadRiskProfilesAction,
  LoadRiskProfilesSuccessAction,
  LoadPerformanceProjectionsAction,
  LoadPerformanceProjectionsSuccessAction,
  LoadCountriesAction,
  LoadCountriesSuccessAction,
  LoadIndustriesAction,
  LoadIndustriesSuccessAction,
  LoadAssetIndustriesSuccessAction,
  LoadAssetIndustriesAction,
  LoadAssetRegionsAction,
  LoadAssetRegionsSuccessAction,
  LoadTitlesAction,
  LoadTitlesSuccessAction,
  LoadViolationsAction,
  LoadViolationsSuccessAction,
} from './config.actions';
import { SecuritiesGetRequestAction } from '../requests/config/securities-get/securities-get-request.actions';
import {
  AssetClass,
  AssetIndustry,
  AssetLabel,
  AssetRegion,
  Country,
  InboxDocumentCategory,
  Industry,
  InterviewAnswer,
  InterviewQuestion,
  InvestmentStrategy,
  PerformanceProjection,
  RiskProfile,
  Security,
  Title,
  TransactionCategory,
  Violation,
} from '../../core/models';
import { AssetClassesGetRequestAction } from '../requests/config/asset-classes-get/asset-classes-get-request.actions';
import { AssetLabelsGetRequestAction } from '../requests/config/asset-labels-get/asset-labels-get-request.actions';
import { InvestmentStrategiesGetRequestAction } from '../requests/config/investment-strategies-get/investment-strategies-get-request.actions';
import { TransactionCategoriesGetRequestAction } from '../requests/config/transaction-categories-get/transaction-categories-get.actions';
import { InboxDocumentCategoriesGetRequestAction } from '../requests/config/inbox-document-categories-get/inbox-document-categories-get.actions';
import { InterviewQuestionsGetRequestAction } from '../requests/config/interview-questions-get/interview-questions-get-request.actions';
import { InterviewAnswersGetRequestAction } from '../requests/config/interview-answers-get/interview-answers-get-request.actions';
import { RiskProfilesGetRequestAction } from '../requests/config/risk-profiles-get/risk-profiles-get-request.actions';
import { PerformanceProjectionsGetRequestAction } from '../requests/config/performance-projections-get/performance-projections-get-request.actions';
import { CountriesGetRequestAction } from '../requests/config/countries-get/countries-get-request.actions';
import { IndustriesGetRequestAction } from '../requests/config/industries-get/industries-get-request.actions';
import { AssetIndustriesGetRequestAction } from '../requests/config/asset-industries-get/asset-industries-get-request.actions';
import { AssetRegionsGetRequestAction } from '../requests/config/asset-regions-get/asset-industries-get-request.actions';
import { TitlesGetRequestAction } from '../requests/config/titles-get/titles-get-request.actions';
import { ViolationsGetRequestAction } from '../requests/config/violations-get/violations-get-request.actions';
import { Injectable } from '@angular/core';
import { saintLague } from '../../shared/utils';

export interface ConfigStateModel {
  securities: Security[];
  assetClasses: AssetClass[];
  assetLabels: AssetLabel[];
  investmentStrategies: InvestmentStrategy[];
  transactionCategories: TransactionCategory[];
  inboxDocumentCategories: InboxDocumentCategory[];
  interviewQuestions: InterviewQuestion[];
  interviewAnswers: InterviewAnswer[];
  riskProfiles: RiskProfile[];
  performanceProjections: PerformanceProjection[];
  countries: Country[];
  industries: Industry[];
  assetIndustries: AssetIndustry[];
  assetRegions: AssetRegion[];
  titles: Title[];
  violations: Violation[];
}

@State<ConfigStateModel>({
  name: 'config',
  defaults: {
    securities: [],
    assetClasses: [],
    assetLabels: [],
    investmentStrategies: [],
    transactionCategories: [],
    inboxDocumentCategories: [],
    interviewQuestions: [],
    interviewAnswers: [],
    riskProfiles: [],
    performanceProjections: [],
    countries: [],
    industries: [],
    assetIndustries: [],
    assetRegions: [],
    titles: [],
    violations: [],
  },
})
@Injectable()
export class ConfigState implements NgxsOnInit {
  constructor(private store: Store) {}

  ngxsOnInit(ctx: StateContext<ConfigStateModel>) {}

  @Action(LoadSecuritiesAction)
  loadSecurities(ctx: StateContext<ConfigStateModel>, action: LoadSecuritiesAction) {
    this.store.dispatch(new SecuritiesGetRequestAction());
  }

  @Action(LoadSecuritiesSuccessAction)
  loadSecuritiesSuccess(ctx: StateContext<ConfigStateModel>, action: LoadSecuritiesSuccessAction) {
    const securities: Security[] = action.payload.map(res => new Security(res));
    const fixedSecurities = securities.map((security: Security) => {
      if (security.assetRegions) {
        const regions = saintLague(
          Object.entries(security.assetRegions),
          o => o[1],
          (o, v) => {
            o[1] = v / 10000;
            return o;
          },
          10000,
        ).reduce((accum, [k, v]) => {
          accum[k] = v;
          return accum;
        }, {});
        security.assetRegions = regions;
      }
      if (security.assetIndustries) {
        const industries = saintLague(
          Object.entries(security.assetIndustries),
          o => o[1],
          (o, v) => {
            o[1] = v / 10000;
            return o;
          },
          10000,
        ).reduce((accum, [k, v]) => {
          accum[k] = v;
          return accum;
        }, {});
        security.assetIndustries = industries;
      }
      return security;
    });
    ctx.patchState({
      securities: fixedSecurities,
    });
  }

  @Action(LoadAssetClassesAction)
  loadAssetClasses(ctx: StateContext<ConfigStateModel>, action: LoadAssetClassesAction) {
    this.store.dispatch(new AssetClassesGetRequestAction());
  }

  @Action(LoadAssetClassesSuccessAction)
  loadAssetClassesSuccess(ctx: StateContext<ConfigStateModel>, action: LoadAssetClassesSuccessAction) {
    const assetClasses: AssetClass[] = action.payload.map(res => new AssetClass(res));
    ctx.patchState({
      assetClasses,
    });
  }

  @Action(LoadAssetLabelsAction)
  loadAssetLabels(ctx: StateContext<ConfigStateModel>, action: LoadAssetLabelsAction) {
    this.store.dispatch(new AssetLabelsGetRequestAction());
  }

  @Action(LoadAssetLabelsSuccessAction)
  loadAssetLabelsSuccess(ctx: StateContext<ConfigStateModel>, action: LoadAssetLabelsSuccessAction) {
    const assetLabels: AssetLabel[] = action.payload.map(res => new AssetLabel(res));
    ctx.patchState({
      assetLabels,
    });
  }

  @Action(LoadInvestmentStrategiesAction)
  loadInvestmentStrategies(ctx: StateContext<ConfigStateModel>, action: LoadInvestmentStrategiesAction) {
    this.store.dispatch(new InvestmentStrategiesGetRequestAction());
  }

  @Action(LoadInvestmentStrategiesSuccessAction)
  loadInvestmentStrategiesSuccess(ctx: StateContext<ConfigStateModel>, action: LoadInvestmentStrategiesSuccessAction) {
    const investmentStrategies: InvestmentStrategy[] = action.payload.map(res => {
      return new InvestmentStrategy(res);
    });
    ctx.patchState({
      investmentStrategies,
    });
  }

  @Action(LoadTransactionCategoriesAction)
  loadTransactionCategories(ctx: StateContext<ConfigStateModel>, action: LoadTransactionCategoriesAction) {
    this.store.dispatch(new TransactionCategoriesGetRequestAction());
  }

  @Action(LoadTransactionCategoriesSuccessAction)
  loadTransactionCategoriesSuccess(ctx: StateContext<ConfigStateModel>, action: LoadTransactionCategoriesSuccessAction) {
    const transactionCategories: TransactionCategory[] = action.payload.map(res => {
      return new TransactionCategory(res);
    });
    ctx.patchState({
      transactionCategories,
    });
  }

  @Action(LoadInboxDocumentCategoriesAction)
  loadInboxDocumentCategories(ctx: StateContext<ConfigStateModel>, action: LoadTransactionCategoriesAction) {
    this.store.dispatch(new InboxDocumentCategoriesGetRequestAction());
  }

  @Action(LoadInboxDocumentCategoriesSuccessAction)
  loadInboxDocumentCategoriesSuccess(ctx: StateContext<ConfigStateModel>, action: LoadTransactionCategoriesSuccessAction) {
    const inboxDocumentCategories: InboxDocumentCategory[] = action.payload.map(res => {
      return new InboxDocumentCategory(res);
    });
    ctx.patchState({
      inboxDocumentCategories,
    });
  }

  @Action(LoadInterviewQuestionsAction)
  loadInterviewQuestions(ctx: StateContext<ConfigStateModel>, action: LoadInterviewQuestionsAction) {
    this.store.dispatch(new InterviewQuestionsGetRequestAction());
  }

  @Action(LoadInterviewQuestionsSuccessAction)
  loadInterviewQuestionsSuccess(ctx: StateContext<ConfigStateModel>, action: LoadInterviewQuestionsSuccessAction) {
    const interviewQuestions: InterviewQuestion[] = action.payload.map(res => {
      return new InterviewQuestion(res);
    });
    ctx.patchState({
      interviewQuestions,
    });
  }

  @Action(LoadInterviewAnswersAction)
  loadInterviewAnswers(ctx: StateContext<ConfigStateModel>, action: LoadInterviewAnswersAction) {
    this.store.dispatch(new InterviewAnswersGetRequestAction());
  }

  @Action(LoadInterviewAnswersSuccessAction)
  loadInterviewAnswersSuccess(ctx: StateContext<ConfigStateModel>, action: LoadInterviewAnswersSuccessAction) {
    const interviewAnswers: InterviewAnswer[] = action.payload.map(res => {
      return new InterviewAnswer(res);
    });
    ctx.patchState({
      interviewAnswers,
    });
  }

  @Action(LoadRiskProfilesAction)
  loadRiskProfiles(ctx: StateContext<ConfigStateModel>, action: LoadRiskProfilesAction) {
    this.store.dispatch(new RiskProfilesGetRequestAction());
  }

  @Action(LoadRiskProfilesSuccessAction)
  loadRiskProfilesSuccess(ctx: StateContext<ConfigStateModel>, action: LoadRiskProfilesSuccessAction) {
    const riskProfiles: RiskProfile[] = action.payload.map(res => {
      return new RiskProfile(res);
    });
    ctx.patchState({
      riskProfiles,
    });
  }

  @Action(LoadPerformanceProjectionsAction)
  loadPerformanceProjections(ctx: StateContext<ConfigStateModel>, action: LoadPerformanceProjectionsAction) {
    this.store.dispatch(new PerformanceProjectionsGetRequestAction(action.payload));
  }

  @Action(LoadPerformanceProjectionsSuccessAction)
  loadPerformanceProjectionsSuccess(ctx: StateContext<ConfigStateModel>, action: LoadPerformanceProjectionsSuccessAction) {
    const performanceProjections: PerformanceProjection[] = action.payload.map(res => {
      return new PerformanceProjection(res);
    });
    ctx.patchState({
      performanceProjections,
    });
    ctx.dispatch(new Navigate(['/', 'orders', 'new', 'update-strategy', 'new-strategy']));
  }

  @Action(LoadCountriesAction)
  loadCountries(ctx: StateContext<ConfigStateModel>, action: LoadCountriesAction) {
    this.store.dispatch(new CountriesGetRequestAction(action.payload));
  }

  @Action(LoadCountriesSuccessAction)
  loadCountriesSuccess(ctx: StateContext<ConfigStateModel>, action: LoadCountriesSuccessAction) {
    const countries: Country[] = action.payload.map(res => {
      return new Country(res);
    });
    ctx.patchState({
      countries,
    });
  }

  @Action(LoadIndustriesAction)
  loadIndustries(ctx: StateContext<ConfigStateModel>, action: LoadIndustriesAction) {
    this.store.dispatch(new IndustriesGetRequestAction());
  }

  @Action(LoadIndustriesSuccessAction)
  loadIndustriesSuccess(ctx: StateContext<ConfigStateModel>, action: LoadIndustriesSuccessAction) {
    const industries: Industry[] = action.payload.map(res => {
      return new Industry(res);
    });
    ctx.patchState({
      industries,
    });
  }

  @Action(LoadAssetIndustriesAction)
  loadAssetIndustries(ctx: StateContext<ConfigStateModel>, action: LoadAssetIndustriesAction) {
    this.store.dispatch(new AssetIndustriesGetRequestAction());
  }

  @Action(LoadAssetIndustriesSuccessAction)
  loadAssetIndustriesSuccess(ctx: StateContext<ConfigStateModel>, action: LoadAssetIndustriesSuccessAction) {
    const assetIndustries: AssetIndustry[] = action.payload.map(res => {
      return new AssetIndustry(res);
    });
    ctx.patchState({
      assetIndustries,
    });
  }

  @Action(LoadAssetRegionsAction)
  loadAssetRegions(ctx: StateContext<ConfigStateModel>, action: LoadAssetRegionsAction) {
    this.store.dispatch(new AssetRegionsGetRequestAction());
  }

  @Action(LoadAssetRegionsSuccessAction)
  loadAssetRegionsSuccess(ctx: StateContext<ConfigStateModel>, action: LoadAssetRegionsSuccessAction) {
    const assetRegions: AssetRegion[] = action.payload.map(res => {
      return new AssetRegion(res);
    });
    ctx.patchState({
      assetRegions,
    });
  }

  @Action(LoadTitlesAction)
  loadTitles(ctx: StateContext<ConfigStateModel>, action: LoadTitlesAction) {
    this.store.dispatch(new TitlesGetRequestAction());
  }

  @Action(LoadTitlesSuccessAction)
  loadTitlesSuccess(ctx: StateContext<ConfigStateModel>, action: LoadTitlesSuccessAction) {
    const titles: Title[] = action.payload.map(res => {
      return new Title(res);
    });
    ctx.patchState({
      titles,
    });
  }

  @Action(LoadViolationsAction)
  loadViolations(ctx: StateContext<ConfigStateModel>, action: LoadViolationsAction) {
    this.store.dispatch(new ViolationsGetRequestAction());
  }

  @Action(LoadViolationsSuccessAction)
  loadViolationsSuccess(ctx: StateContext<ConfigStateModel>, action: LoadViolationsSuccessAction) {
    const violations: Violation[] = action.payload.map(res => {
      return new Violation(res);
    });
    ctx.patchState({
      violations,
    });
  }
}
