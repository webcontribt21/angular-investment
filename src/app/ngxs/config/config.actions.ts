const ActionTypes = {
  LOAD_SECURITIES: `[Config] Load Securities`,
  LOAD_SECURITIES_SUCCESS: `[Config] Load Securities Success`,
  LOAD_SECURITIES_FAIL: `[Config] Load Securities Fail`,

  LOAD_ASSET_CLASSES: `[Config] Load Asset Classes`,
  LOAD_ASSET_CLASSES_SUCCESS: `[Config] Load Asset Classes Success`,
  LOAD_ASSET_CLASSES_FAIL: `[Config] Load Asset Classes Fail`,

  LOAD_ASSET_LABELS: `[Config] Load Asset Labels`,
  LOAD_ASSET_LABELS_SUCCESS: `[Config] Load Asset Labels Success`,
  LOAD_ASSET_LABELS_FAIL: `[Config] Load Asset Labels Fail`,

  LOAD_INVESTMENT_STRATEGIES: `[Config] Load Investment Strategies`,
  LOAD_INVESTMENT_STRATEGIES_SUCCESS: `[Config] Load Investment Strategies Success`,
  LOAD_INVESTMENT_STRATEGIES_FAIL: `[Config] Load Investment Strategies Fail`,

  LOAD_TRANSACTION_CATEGORIES: `[Config] Load Transaction Categories`,
  LOAD_TRANSACTION_CATEGORIES_SUCCESS: `[Config] Load Transaction Categories Success`,
  LOAD_TRANSACTION_CATEGORIES_FAIL: `[Config] Load Transaction Categories Fail`,

  LOAD_INBOX_DOCUMENT_CATEGORIES: `[Config] Load Inbox Document Categories`,
  LOAD_INBOX_DOCUMENT_CATEGORIES_SUCCESS: `[Config] Load Inbox Document Categories Success`,
  LOAD_INBOX_DOCUMENT_CATEGORIES_FAIL: `[Config] Load Inbox Document Categories Fail`,

  LOAD_INTERVIEW_QUESTIONS: `[Config] Load Interview Questions`,
  LOAD_INTERVIEW_QUESTIONS_SUCCESS: `[Config] Load Interview Questions Success`,
  LOAD_INTERVIEW_QUESTIONS_FAIL: `[Config] Load Interview Questions Fail`,

  LOAD_INTERVIEW_ANSWERS: `[Config] Load Interview Answers`,
  LOAD_INTERVIEW_ANSWERS_SUCCESS: `[Config] Load Interview Answers Success`,
  LOAD_INTERVIEW_ANSWERS_FAIL: `[Config] Load Interview Answers Fail`,

  LOAD_RISK_PROFILES: `[Config] Load Risk Profiles`,
  LOAD_RISK_PROFILES_SUCCESS: `[Config] Load Risk Profiles Success`,
  LOAD_RISK_PROFILES_FAIL: `[Config] Load Risk Profiles Fail`,

  LOAD_PERFORMANCE_PROJECTIONS: `[Config] Load Performance Projections`,
  LOAD_PERFORMANCE_PROJECTIONS_SUCCESS: `[Config] Load Performance Projections Success`,
  LOAD_PERFORMANCE_PROJECTIONS_FAIL: `[Config] Load Performance Projections Fail`,

  LOAD_COUNTRIES: `[Config] Load Countries`,
  LOAD_COUNTRIES_SUCCESS: `[Config] Load Countries Success`,
  LOAD_COUNTRIES_FAIL: `[Config] Load Countries Fail`,

  LOAD_INDUSTRIES: `[Config] Load Industries`,
  LOAD_INDUSTRIES_SUCCESS: `[Config] Load Industries Success`,
  LOAD_INDUSTRIES_FAIL: `[Config] Load Industries Fail`,

  LOAD_ASSET_INDUSTRIES: `[Config] Load Asset Industries`,
  LOAD_ASSET_INDUSTRIES_SUCCESS: `[Config] Load Asset Industries Success`,
  LOAD_ASSET_INDUSTRIES_FAIL: `[Config] Load Asset Industries Fail`,

  LOAD_ASSET_REGIONS: `[Config] Load Asset Regions`,
  LOAD_ASSET_REGIONS_SUCCESS: `[Config] Load Asset Regions Success`,
  LOAD_ASSET_REGIONS_FAIL: `[Config] Load Asset Regions Fail`,

  LOAD_TITLES: `[Config] Load Titles`,
  LOAD_TITLES_SUCCESS: `[Config] Load Titles Success`,
  LOAD_TITLES_FAIL: `[Config] Load Titles Fail`,

  LOAD_VIOLATIONS: `[Config] Load Violations`,
  LOAD_VIOLATIONS_SUCCESS: `[Config] Load Violations Success`,
  LOAD_VIOLATIONS_FAIL: `[Config] Load Violations Fail`,
};

export class LoadSecuritiesAction {
  static type = ActionTypes.LOAD_SECURITIES;

  constructor(public payload?: any) {}
}
export class LoadSecuritiesSuccessAction {
  static type = ActionTypes.LOAD_SECURITIES_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadSecuritiesFailAction {
  static type = ActionTypes.LOAD_SECURITIES_FAIL;

  constructor(public payload: any) {}
}

export class LoadAssetClassesAction {
  static type = ActionTypes.LOAD_ASSET_CLASSES;

  constructor(public payload?: any) {}
}
export class LoadAssetClassesSuccessAction {
  static type = ActionTypes.LOAD_ASSET_CLASSES_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadAssetClassesFailAction {
  static type = ActionTypes.LOAD_ASSET_CLASSES_FAIL;

  constructor(public payload: any) {}
}

export class LoadAssetLabelsAction {
  static type = ActionTypes.LOAD_ASSET_LABELS;

  constructor(public payload?: any) {}
}
export class LoadAssetLabelsSuccessAction {
  static type = ActionTypes.LOAD_ASSET_LABELS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadAssetLabelsFailAction {
  static type = ActionTypes.LOAD_ASSET_LABELS_FAIL;

  constructor(public payload: any) {}
}

export class LoadInvestmentStrategiesAction {
  static type = ActionTypes.LOAD_INVESTMENT_STRATEGIES;

  constructor(public payload?: any) {}
}
export class LoadInvestmentStrategiesSuccessAction {
  static type = ActionTypes.LOAD_INVESTMENT_STRATEGIES_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadInvestmentStrategiesFailAction {
  static type = ActionTypes.LOAD_INVESTMENT_STRATEGIES_FAIL;

  constructor(public payload: any) {}
}

export class LoadTransactionCategoriesAction {
  static type = ActionTypes.LOAD_TRANSACTION_CATEGORIES;

  constructor(public payload?: any) {}
}
export class LoadTransactionCategoriesSuccessAction {
  static type = ActionTypes.LOAD_TRANSACTION_CATEGORIES_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadTransactionCategoriesFailAction {
  static type = ActionTypes.LOAD_TRANSACTION_CATEGORIES_FAIL;

  constructor(public payload: any) {}
}

export class LoadInboxDocumentCategoriesAction {
  static type = ActionTypes.LOAD_INBOX_DOCUMENT_CATEGORIES;

  constructor(public payload?: any) {}
}
export class LoadInboxDocumentCategoriesSuccessAction {
  static type = ActionTypes.LOAD_INBOX_DOCUMENT_CATEGORIES_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadInboxDocumentCategoriesFailAction {
  static type = ActionTypes.LOAD_INBOX_DOCUMENT_CATEGORIES_FAIL;

  constructor(public payload: any) {}
}

export class LoadInterviewQuestionsAction {
  static type = ActionTypes.LOAD_INTERVIEW_QUESTIONS;

  constructor(public payload?: any) {}
}
export class LoadInterviewQuestionsSuccessAction {
  static type = ActionTypes.LOAD_INTERVIEW_QUESTIONS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadInterviewQuestionsFailAction {
  static type = ActionTypes.LOAD_INTERVIEW_QUESTIONS_FAIL;

  constructor(public payload: any) {}
}

export class LoadInterviewAnswersAction {
  static type = ActionTypes.LOAD_INTERVIEW_ANSWERS;

  constructor(public payload?: any) {}
}
export class LoadInterviewAnswersSuccessAction {
  static type = ActionTypes.LOAD_INTERVIEW_ANSWERS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadInterviewAnswersFailAction {
  static type = ActionTypes.LOAD_INTERVIEW_ANSWERS_FAIL;

  constructor(public payload: any) {}
}

export class LoadRiskProfilesAction {
  static type = ActionTypes.LOAD_RISK_PROFILES;

  constructor(public payload?: any) {}
}
export class LoadRiskProfilesSuccessAction {
  static type = ActionTypes.LOAD_RISK_PROFILES_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadRiskProfilesFailAction {
  static type = ActionTypes.LOAD_RISK_PROFILES_FAIL;

  constructor(public payload: any) {}
}

export class LoadPerformanceProjectionsAction {
  static type = ActionTypes.LOAD_PERFORMANCE_PROJECTIONS;

  constructor(public payload?: any) {}
}
export class LoadPerformanceProjectionsSuccessAction {
  static type = ActionTypes.LOAD_PERFORMANCE_PROJECTIONS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadPerformanceProjectionsFailAction {
  static type = ActionTypes.LOAD_PERFORMANCE_PROJECTIONS_FAIL;

  constructor(public payload: any) {}
}

export class LoadCountriesAction {
  static type = ActionTypes.LOAD_COUNTRIES;

  constructor(public payload?: any) {}
}
export class LoadCountriesSuccessAction {
  static type = ActionTypes.LOAD_COUNTRIES_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadCountriesFailAction {
  static type = ActionTypes.LOAD_COUNTRIES_FAIL;

  constructor(public payload: any) {}
}

export class LoadIndustriesAction {
  static type = ActionTypes.LOAD_INDUSTRIES;

  constructor(public payload?: any) {}
}
export class LoadIndustriesSuccessAction {
  static type = ActionTypes.LOAD_INDUSTRIES_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadIndustriesFailAction {
  static type = ActionTypes.LOAD_INDUSTRIES_FAIL;

  constructor(public payload: any) {}
}

export class LoadAssetIndustriesAction {
  static type = ActionTypes.LOAD_ASSET_INDUSTRIES;

  constructor(public payload?: any) {}
}
export class LoadAssetIndustriesSuccessAction {
  static type = ActionTypes.LOAD_ASSET_INDUSTRIES_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadAssetIndustriesFailAction {
  static type = ActionTypes.LOAD_ASSET_INDUSTRIES_FAIL;

  constructor(public payload: any) {}
}

export class LoadAssetRegionsAction {
  static type = ActionTypes.LOAD_ASSET_REGIONS;

  constructor(public payload?: any) {}
}
export class LoadAssetRegionsSuccessAction {
  static type = ActionTypes.LOAD_ASSET_REGIONS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadAssetRegionsFailAction {
  static type = ActionTypes.LOAD_ASSET_REGIONS_FAIL;

  constructor(public payload: any) {}
}

export class LoadTitlesAction {
  static type = ActionTypes.LOAD_TITLES;

  constructor(public payload?: any) {}
}
export class LoadTitlesSuccessAction {
  static type = ActionTypes.LOAD_TITLES_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadTitlesFailAction {
  static type = ActionTypes.LOAD_TITLES_FAIL;

  constructor(public payload: any) {}
}

export class LoadViolationsAction {
  static type = ActionTypes.LOAD_VIOLATIONS;

  constructor(public payload?: any) {}
}
export class LoadViolationsSuccessAction {
  static type = ActionTypes.LOAD_VIOLATIONS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadViolationsFailAction {
  static type = ActionTypes.LOAD_VIOLATIONS_FAIL;

  constructor(public payload: any) {}
}
