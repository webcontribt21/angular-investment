/* tslint:disable:member-ordering no-unused-variable */
import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { environment } from '../../environments/environment';
import { ApplicationState } from './application';
import { UserState } from './user';
import { CustomerState } from './customer';
import { ConfigState } from './config';
import { ApeironState } from './apeiron';
import { NotificationsState } from './notifications';
import { OrderState } from './order';
import { InterviewState } from './interview';
import { UploadState } from './upload';
import { RequestsState } from './requests/requests.state';
import { UserGetRequestState } from './requests/user/user-get/user-get-request.state';
import { CustomerGetRequestState } from './requests/customer/customer-get/customer-get-request.state';
import { SecuritiesGetRequestState } from './requests/config/securities-get/securities-get-request.state';
import { AssetClassesGetRequestState } from './requests/config/asset-classes-get/asset-classes-get-request.state';
import { AssetLabelsGetRequestState } from './requests/config/asset-labels-get/asset-labels-get-request.state';
import { PortfolioGetRequestState } from './requests/apeiron/portfolio-get/portfolio-get-request.state';
import { PortfolioPerformanceGetRequestState } from './requests/apeiron/portfolio-performance-get/portfolio-performance-get-request.state';
import { InvestmentStrategiesGetRequestState } from './requests/config/investment-strategies-get/investment-strategies-get-request.state';
import { BalanceHistoryGetRequestState } from './requests/apeiron/balance-history-get/balance-history-get-request.state';
import { PerformanceHistoryGetRequestState } from './requests/apeiron/performance-history-get/performance-history-get-request.state';
import { TransactionsGetRequestState } from './requests/apeiron/transactions-get/transactions-get-request.state';
import { TransactionCategoriesGetRequestState } from './requests/config/transaction-categories-get/transaction-categories-get.state';
import { InboxDocumentCategoriesGetRequestState } from './requests/config/inbox-document-categories-get/inbox-document-categories-get.state';
import { CustomerDocumentsGetRequestState } from './requests/customer/customer-documents-get/customer-documents-get-request.state';
import { TransactionsSummaryGetRequestState } from './requests/apeiron/transactions-summary-get/transactions-summary-get-request.state';
import { CustomerLatestDocumentsGetRequestState } from './requests/customer/customer-latest-documents-get/customer-latest-documents-get-request.state';
import { OrdersGetRequestState } from './requests/order/orders-get/orders-get-request.state';
import { OrdersPostRequestState } from './requests/order/orders-post/orders-post-request.state';
import { OrdersPatchRequestState } from './requests/order/orders-patch/orders-patch-request.state';
import { InterviewQuestionsGetRequestState } from './requests/config/interview-questions-get/interview-questions-get-request.state';
import { InterviewAnswersGetRequestState } from './requests/config/interview-answers-get/interview-answers-get-request.state';
import { RiskProfilesGetRequestState } from './requests/config/risk-profiles-get/risk-profiles-get-request.state';
import { InterviewsPostRequestState } from './requests/interview/interviews-post/interviews-post-request.state';
import { PerformanceProjectionsGetRequestState } from './requests/config/performance-projections-get/performance-projections-get-request.state';
import { CountriesGetRequestState } from './requests/config/countries-get/countries-get-request.state';
import { UserPatchRequestState } from './requests/user/user-patch/user-patch-request.state';
import { IndustriesGetRequestState } from './requests/config/industries-get/industries-get-request.state';
import { AssetIndustriesGetRequestState } from './requests/config/asset-industries-get/asset-industries-get-request.state';
import { AssetRegionsGetRequestState } from './requests/config/asset-regions-get/asset-industries-get-request.state';
import { PasswordPostRequestState } from './requests/user/password-post/password-post-request.state';
import { EmailPostRequestState } from './requests/user/email-post/email-post-request.state';
import { UploadUrlGetRequestState } from './requests/upload/upload-url-get/upload-url-get-request.state';
import { UploadFilePutRequestState } from './requests/upload/upload-file-put/upload-file-put-request.state';
import { TitlesGetRequestState } from './requests/config/titles-get/titles-get-request.state';
import { PdfTemplatessPostRequestState } from './requests/upload/pdf-templates-post/pdf-templates-post-request.state';
import { OrderConstraintsGetRequestState } from './requests/order/order-constraints-get/order-constraints-get-request.state';
import { CustomerPatchRequestState } from './requests/customer/customer-patch/customer-patch-request.state';
import { ActivityFeedGetRequestState } from './requests/notifications/activity-feed-get/activity-feed-get-request.state';
import { ViolationsGetRequestState } from './requests/config/violations-get/violations-get-request.state';
import { IbanState } from './iban';
import { IbanValidateGetRequestState } from './requests/iban/validate-get/validate-get-request.state';

@NgModule({
  imports: [
    NgxsModule.forRoot(
      [
        RequestsState,
        UserState,
        CustomerState,
        ConfigState,
        ApeironState,
        NotificationsState,
        OrderState,
        InterviewState,
        UploadState,
        IbanState,

        ApplicationState,
        // requests
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
        IbanValidateGetRequestState,
      ],
      {
        developmentMode: !environment.production,
        selectorOptions: { suppressErrors: true },
      },
    ),
    NgxsStoragePluginModule.forRoot({
      key: ['customer.selectedCustomerId', 'apeiron.selectedHistory', 'apeiron.selectedBalancePeriod', 'apeiron.selectedPerformancePeriod'],
    }),
    NgxsLoggerPluginModule.forRoot({
      collapsed: false,
      disabled: environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
  ],
  declarations: [],
  providers: [],
})
export class NgxsStoreModule {}
