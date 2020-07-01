import { Selector } from '@ngxs/store';

import { ConfigState, ConfigStateModel } from './config.state';
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

export class ConfigGetterState {
  @Selector([ConfigState])
  static getConfigState(state: ConfigStateModel): ConfigStateModel {
    return state;
  }

  @Selector([ConfigState])
  static getSecurities(state: ConfigStateModel): Security[] {
    return state.securities;
  }

  @Selector([ConfigState])
  static getAssetClasses(state: ConfigStateModel): AssetClass[] {
    return state.assetClasses;
  }

  @Selector([ConfigState])
  static getAssetLabels(state: ConfigStateModel): AssetLabel[] {
    return state.assetLabels;
  }

  @Selector([ConfigState])
  static getInvestmentStrategies(state: ConfigStateModel): InvestmentStrategy[] {
    return state.investmentStrategies;
  }

  @Selector([ConfigState])
  static getTransactionCategories(state: ConfigStateModel): TransactionCategory[] {
    return state.transactionCategories;
  }

  @Selector([ConfigState])
  static getInboxDocumentCategories(state: ConfigStateModel): InboxDocumentCategory[] {
    return state.inboxDocumentCategories;
  }

  @Selector([ConfigState])
  static getInterviewQuestions(state: ConfigStateModel): InterviewQuestion[] {
    return state.interviewQuestions;
  }

  @Selector([ConfigState])
  static getInterviewAnswers(state: ConfigStateModel): InterviewAnswer[] {
    return state.interviewAnswers;
  }

  @Selector([ConfigState])
  static getRiskProfiles(state: ConfigStateModel): RiskProfile[] {
    return state.riskProfiles;
  }

  @Selector([ConfigState])
  static getPerformanceProjections(state: ConfigStateModel): PerformanceProjection[] {
    return state.performanceProjections;
  }

  @Selector([ConfigState])
  static getCountries(state: ConfigStateModel): Country[] {
    return state.countries;
  }

  @Selector([ConfigState])
  static getIndustries(state: ConfigStateModel): Industry[] {
    return state.industries;
  }

  @Selector([ConfigState])
  static getAssetIndustries(state: ConfigStateModel): AssetIndustry[] {
    return state.assetIndustries;
  }

  @Selector([ConfigState])
  static getAssetRegions(state: ConfigStateModel): AssetRegion[] {
    return state.assetRegions;
  }

  @Selector([ConfigState])
  static getTitles(state: ConfigStateModel): Title[] {
    return state.titles;
  }

  @Selector([ConfigState])
  static getViolations(state: ConfigStateModel): Violation[] {
    return state.violations;
  }
}
