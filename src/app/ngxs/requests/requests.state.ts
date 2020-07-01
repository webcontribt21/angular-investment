import { Selector, State } from '@ngxs/store';

import { IRequestsNestedState } from './requests.interface';
import { UserGetRequestState } from './user/user-get/user-get-request.state';
import { CustomerGetRequestState } from './customer/customer-get/customer-get-request.state';
import { SecuritiesGetRequestState } from './config/securities-get/securities-get-request.state';
import { AssetClassesGetRequestState } from './config/asset-classes-get/asset-classes-get-request.state';
import { AssetLabelsGetRequestState } from './config/asset-labels-get/asset-labels-get-request.state';
import { InvestmentStrategiesGetRequestState } from './config/investment-strategies-get/investment-strategies-get-request.state';
import { PortfolioGetRequestState } from './apeiron/portfolio-get/portfolio-get-request.state';
import { PortfolioPerformanceGetRequestState } from './apeiron/portfolio-performance-get/portfolio-performance-get-request.state';
import { BalanceHistoryGetRequestState } from './apeiron/balance-history-get/balance-history-get-request.state';
import { PerformanceHistoryGetRequestState } from './apeiron/performance-history-get/performance-history-get-request.state';
import { TransactionsGetRequestState } from './apeiron/transactions-get/transactions-get-request.state';
import { TransactionCategoriesGetRequestState } from './config/transaction-categories-get/transaction-categories-get.state';
import { InboxDocumentCategoriesGetRequestState } from './config/inbox-document-categories-get/inbox-document-categories-get.state';
import { CustomerDocumentsGetRequestState } from './customer/customer-documents-get/customer-documents-get-request.state';
import { TransactionsSummaryGetRequestState } from './apeiron/transactions-summary-get/transactions-summary-get-request.state';
import { ActivityFeedGetRequestState } from './notifications/activity-feed-get/activity-feed-get-request.state';
import { CustomerLatestDocumentsGetRequestState } from './customer/customer-latest-documents-get/customer-latest-documents-get-request.state';
import { OrdersGetRequestState } from './order/orders-get/orders-get-request.state';
import { OrdersPostRequestState } from './order/orders-post/orders-post-request.state';
import { OrdersPatchRequestState } from './order/orders-patch/orders-patch-request.state';
import { InterviewQuestionsGetRequestState } from './config/interview-questions-get/interview-questions-get-request.state';
import { InterviewAnswersGetRequestState } from './config/interview-answers-get/interview-answers-get-request.state';
import { RiskProfilesGetRequestState } from './config/risk-profiles-get/risk-profiles-get-request.state';
import { InterviewsPostRequestState } from './interview/interviews-post/interviews-post-request.state';
import { PerformanceProjectionsGetRequestState } from './config/performance-projections-get/performance-projections-get-request.state';
import { CountriesGetRequestState } from './config/countries-get/countries-get-request.state';
import { UserPatchRequestState } from './user/user-patch/user-patch-request.state';
import { IndustriesGetRequestState } from './config/industries-get/industries-get-request.state';
import { AssetIndustriesGetRequestState } from './config/asset-industries-get/asset-industries-get-request.state';
import { AssetRegionsGetRequestState } from './config/asset-regions-get/asset-industries-get-request.state';
import { PasswordPostRequestState } from './user/password-post/password-post-request.state';
import { EmailPostRequestState } from './user/email-post/email-post-request.state';
import { UploadUrlGetRequestState } from './upload/upload-url-get/upload-url-get-request.state';
import { UploadFilePutRequestState } from './upload/upload-file-put/upload-file-put-request.state';
import { TitlesGetRequestState } from './config/titles-get/titles-get-request.state';
import { PdfTemplatessPostRequestState } from './upload/pdf-templates-post/pdf-templates-post-request.state';
import { OrderConstraintsGetRequestState } from './order/order-constraints-get/order-constraints-get-request.state';
import { CustomerPatchRequestState } from './customer/customer-patch/customer-patch-request.state';
import { ViolationsGetRequestState } from './config/violations-get/violations-get-request.state';
import { Injectable } from '@angular/core';

export interface RequestsStateModel {}

@State<RequestsStateModel>({
  name: 'requests',
  defaults: {},
  children: [
    UserGetRequestState,
    CustomerGetRequestState,
    SecuritiesGetRequestState,
    AssetClassesGetRequestState,
    AssetLabelsGetRequestState,
    InvestmentStrategiesGetRequestState,
    ActivityFeedGetRequestState,
    PortfolioGetRequestState,
    PortfolioPerformanceGetRequestState,
    BalanceHistoryGetRequestState,
    PerformanceHistoryGetRequestState,
    TransactionsGetRequestState,
    TransactionCategoriesGetRequestState,
    InboxDocumentCategoriesGetRequestState,
    CustomerDocumentsGetRequestState,
    TransactionsSummaryGetRequestState,
    CustomerLatestDocumentsGetRequestState,
    OrdersGetRequestState,
    OrdersPostRequestState,
    OrdersPatchRequestState,
    InterviewQuestionsGetRequestState,
    InterviewAnswersGetRequestState,
    RiskProfilesGetRequestState,
    InterviewsPostRequestState,
    PerformanceProjectionsGetRequestState,
    CountriesGetRequestState,
    UserPatchRequestState,
    IndustriesGetRequestState,
    AssetIndustriesGetRequestState,
    AssetRegionsGetRequestState,
    PasswordPostRequestState,
    EmailPostRequestState,
    UploadUrlGetRequestState,
    UploadFilePutRequestState,
    TitlesGetRequestState,
    PdfTemplatessPostRequestState,
    OrderConstraintsGetRequestState,
    CustomerPatchRequestState,
    ViolationsGetRequestState,
  ],
})
@Injectable()
export class RequestsState {
  @Selector()
  static loadingStatus(requestsState: { [key: string]: IRequestsNestedState }): boolean {
    const states = Object.values(requestsState);
    return (
      states.filter(state => {
        // filter requests state and states that are not loading
        return state && state.hasOwnProperty('loading') && state.loading;
      }).length > 0
    );
  }
}
