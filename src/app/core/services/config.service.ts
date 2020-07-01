import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';

import { ConfigTypeEnum } from '../enums/config-type.enum';
import { InvestmentStrategyEnum } from '../enums/investment-strategy.enum';
import { I18nService } from './i18n.service';
import { LanguagesEnum } from '../enums/i18n.enum';
import {
  AssetClass,
  AssetIndustry,
  AssetLabel,
  AssetRegion,
  Country,
  Customer,
  InboxDocumentCategory,
  Industry,
  InterviewAnswer,
  InterviewQuestion,
  InvestmentStrategy,
  PerformanceProjection,
  Portfolio,
  RiskProfile,
  Security,
  Title,
  TransactionCategory,
  Violation,
} from '../models';

import { ConfigGetterState } from '../../ngxs/config';
import { IRequestsNestedState } from '../../ngxs/requests/requests.interface';
import {
  LoadAssetClassesAction,
  LoadAssetIndustriesAction,
  LoadAssetLabelsAction,
  LoadAssetRegionsAction,
  LoadCountriesAction,
  LoadInboxDocumentCategoriesAction,
  LoadIndustriesAction,
  LoadInterviewAnswersAction,
  LoadInterviewQuestionsAction,
  LoadInvestmentStrategiesAction,
  LoadPerformanceProjectionsAction,
  LoadRiskProfilesAction,
  LoadSecuritiesAction,
  LoadTitlesAction,
  LoadTransactionCategoriesAction,
  LoadViolationsAction,
} from '../../ngxs/config/config.actions';
import { CustomerGetterState } from '../../ngxs/customer';
import { ApeironGetterState } from '../../ngxs/apeiron';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  @Select(ConfigGetterState.getSecurities)
  securities$: Observable<Security[]>;
  securitiesGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getAssetClasses)
  assetClasses$: Observable<AssetClass[]>;
  assetClassesGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getAssetLabels)
  assetLabels$: Observable<AssetLabel[]>;
  assetLabelsGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getInvestmentStrategies)
  investmentStrategies$: Observable<InvestmentStrategy[]>;
  investmentStrategiesGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getTransactionCategories)
  transactionCategories$: Observable<TransactionCategory[]>;
  transactionCategoriesGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getInboxDocumentCategories)
  inboxDocumentCategories$: Observable<InboxDocumentCategory[]>;
  inboxDocumentCategoriesGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getInterviewQuestions)
  interviewQuestions$: Observable<InterviewQuestion[]>;
  interviewQuestionsGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getInterviewAnswers)
  interviewAnswers$: Observable<InterviewAnswer[]>;
  interviewAnswersGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getRiskProfiles)
  riskProfiles$: Observable<RiskProfile[]>;
  riskProfilesGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getPerformanceProjections)
  performanceProjections$: Observable<PerformanceProjection[]>;
  performanceProjectionsGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getCountries)
  countries$: Observable<Country[]>;
  countriesGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getIndustries)
  industries$: Observable<Industry[]>;
  industriesGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getAssetIndustries)
  assetIndustries$: Observable<AssetIndustry[]>;
  assetIndustriesGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getAssetRegions)
  assetRegions$: Observable<AssetRegion[]>;
  assetRegionsGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getTitles)
  titles$: Observable<Title[]>;
  titlesGetRequestState$: Observable<IRequestsNestedState>;

  @Select(ConfigGetterState.getViolations)
  violations$: Observable<Violation[]>;
  violationsGetRequestState$: Observable<IRequestsNestedState>;

  @Select(CustomerGetterState.getSelectedCustomer)
  selectedCustomer$: Observable<Customer>;

  @Select(ApeironGetterState.getPortfolio)
  portfolio$: Observable<Portfolio>;

  constructor(private store: Store, private httpClient: HttpClient, private i18nService: I18nService) {
    this.securitiesGetRequestState$ = this.getRequestState('securitiesGetRequestState');
    this.assetClassesGetRequestState$ = this.getRequestState('assetClassesGetRequestState');
    this.assetLabelsGetRequestState$ = this.getRequestState('assetLabelsGetRequestState');
    this.investmentStrategiesGetRequestState$ = this.getRequestState('investmentStrategiesGetRequestState');
    this.transactionCategoriesGetRequestState$ = this.getRequestState('transactionCategoriesGetRequestState');
    this.inboxDocumentCategoriesGetRequestState$ = this.getRequestState('inboxDocumentCategoriesGetRequestState');
    this.interviewQuestionsGetRequestState$ = this.getRequestState('interviewQuestionsGetRequestState');
    this.interviewAnswersGetRequestState$ = this.getRequestState('interviewAnswersGetRequestState');
    this.riskProfilesGetRequestState$ = this.getRequestState('riskProfilesGetRequestState');
    this.performanceProjectionsGetRequestState$ = this.getRequestState('performanceProjectionsGetRequestState');
    this.countriesGetRequestState$ = this.getRequestState('countriesGetRequestState');
    this.industriesGetRequestState$ = this.getRequestState('industriesGetRequestState');
    this.assetIndustriesGetRequestState$ = this.getRequestState('assetIndustriesGetRequestState');
    this.assetRegionsGetRequestState$ = this.getRequestState('assetRegionsGetRequestState');
    this.titlesGetRequestState$ = this.getRequestState('titlesGetRequestState');
    this.violationsGetRequestState$ = this.getRequestState('violationsGetRequestState');
  }

  getRequestState(key: string): Observable<IRequestsNestedState> {
    return this.store.select(state => state.requests[key]);
  }

  getStrategyByCode() {
    return this.getStrategyByCode$.bind(this);
  }

  getStrategyByCode$(strategyCode$: Observable<InvestmentStrategyEnum>): Observable<InvestmentStrategy> {
    return strategyCode$.pipe(
      switchMap((strategyCode: InvestmentStrategyEnum) => {
        return this.investmentStrategies$.pipe(
          map((strategies: InvestmentStrategy[]) => {
            return strategies.find(strategy => {
              return strategy.code === strategyCode;
            });
          }),
          filter(res => !!res),
          take(1),
        );
      }),
    );
  }

  strategyToDisplay() {
    return (investmentStrategy$: Observable<InvestmentStrategy>) =>
      this.i18nService.selectedLang$.pipe(
        switchMap((selectedLang: LanguagesEnum) => {
          return investmentStrategy$.pipe(
            map((strategy: InvestmentStrategy) => {
              return {
                labelSuffix: strategy.labelSuffix,
                description: strategy.description[selectedLang],
                link: strategy.link[selectedLang],
              };
            }),
          );
        }),
      );
  }

  loadSecurities(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadSecuritiesAction());
    return this.securitiesGetRequestState$;
  }

  loadAssetClasses(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadAssetClassesAction());
    return this.assetClassesGetRequestState$;
  }

  loadAssetLabels(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadAssetLabelsAction());
    return this.assetLabelsGetRequestState$;
  }

  loadInvestmentStrategies(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadInvestmentStrategiesAction());
    return this.investmentStrategiesGetRequestState$;
  }

  loadInboxDocumentCategories(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadInboxDocumentCategoriesAction());
    return this.inboxDocumentCategoriesGetRequestState$;
  }

  loadTransactionCategories(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadTransactionCategoriesAction());
    return this.transactionCategoriesGetRequestState$;
  }

  loadInterviewQuestions(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadInterviewQuestionsAction());
    return this.interviewQuestionsGetRequestState$;
  }

  loadInterviewAnswers(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadInterviewAnswersAction());
    return this.interviewAnswersGetRequestState$;
  }

  loadRiskProfiles(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadRiskProfilesAction());
    return this.riskProfilesGetRequestState$;
  }

  loadPerformanceProjections(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadPerformanceProjectionsAction());
    return this.performanceProjectionsGetRequestState$;
  }

  loadCountries(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadCountriesAction());
    return this.countriesGetRequestState$;
  }

  loadIndustries(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadIndustriesAction());
    return this.industriesGetRequestState$;
  }

  loadAssetIndustries(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadAssetIndustriesAction());
    return this.assetIndustriesGetRequestState$;
  }

  loadAssetRegions(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadAssetRegionsAction());
    return this.assetRegionsGetRequestState$;
  }

  loadTitles(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadTitlesAction());
    return this.titlesGetRequestState$;
  }

  loadViolations(): Observable<IRequestsNestedState> {
    this.store.dispatch(new LoadViolationsAction());
    return this.violationsGetRequestState$;
  }

  loadConfigRequest(configType: ConfigTypeEnum, data?) {
    return this.httpClient.get('refdata/v2/' + configType, data);
  }

  loadPerformanceProjectionsRequest(strategy: InvestmentStrategyEnum) {
    const configType = ConfigTypeEnum.performanceProjections;
    return combineLatest(this.selectedCustomer$.pipe(filter(res => !!res)), this.portfolio$.pipe(filter(res => !!res))).pipe(
      take(1),
      switchMap(([selectedCustomer, portfolio]: [Customer, Portfolio]) => {
        return this.loadConfigRequest(configType, {
          params: {
            investmentStrategy: strategy,
            investmentPeriodMonths: 360,
            startDate: new Date().toISOString().slice(0, 10),
            initialDepositAmount: portfolio.currentBalance,
            recurringDepositAmount: selectedCustomer.currentRecurringDeposit.amount,
            recurringDepositType: selectedCustomer.currentRecurringDeposit.schedule,
          },
        });
      }),
    );
  }
}
