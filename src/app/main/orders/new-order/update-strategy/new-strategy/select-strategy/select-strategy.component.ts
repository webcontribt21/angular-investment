import { Component, OnDestroy, OnInit } from '@angular/core';

import { Options } from 'ng5-slider';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';

import { ConfigService, InterviewService } from '../../../../../../core/services';
import { InvestmentStrategyEnum } from '../../../../../../core/enums/investment-strategy.enum';
import { Interview, RiskProfile, StrategyToDisplay } from '../../../../../../core/models';

@Component({
  selector: 'app-select-strategy',
  templateUrl: './select-strategy.component.html',
  styleUrls: ['./select-strategy.component.scss'],
})
export class SelectStrategyComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  options: Options;

  selectedInterview$: Observable<Interview>;
  selectedStrategyCode$: Observable<InvestmentStrategyEnum>;
  selectedStrategy$: Observable<StrategyToDisplay>;
  riskProfile$: Observable<RiskProfile>;
  selectedStrategyValue$: Observable<number>;

  constructor(private interviewService: InterviewService, private configService: ConfigService) {}

  ngOnInit() {
    this.selectedStrategyCode$ = this.interviewService.selectedInvestmentStrategy$;
    this.selectedStrategy$ = this.interviewService.selectedStrategyToDisplay$;
    this.selectedInterview$ = this.interviewService.selectedInterview$.pipe(filter(res => !!res));
    this.selectedStrategyValue$ = this.selectedStrategyCode$.pipe(
      filter(res => !!res),
      map(strategy => this.getNumberFromStrategy(strategy)),
    );
    this.riskProfile$ = this.selectedInterview$.pipe(
      withLatestFrom(this.configService.riskProfiles$),
      map(([interview, riskProfiles]: [Interview, RiskProfile[]]) => {
        return riskProfiles.find(profile => profile.code === interview.riskProfile);
      }),
      take(1),
    );

    this.subscriptions.push(
      this.riskProfile$.subscribe((riskProfile: RiskProfile) => {
        const possibleStrategies: InvestmentStrategyEnum[] = riskProfile.acceptableInvestmentStrategies;
        const highestStrategy: InvestmentStrategyEnum = possibleStrategies[possibleStrategies.length - 1];
        this.options = {
          floor: 11,
          ceil: 20,
          step: 1,
          showTicks: true,
          minLimit: 11,
          maxLimit: possibleStrategies.length + 10 || 20,
          showSelectionBar: true,
          hidePointerLabels: true,
          hideLimitLabels: true,
          getTickColor: value => {
            if (value <= this.getNumberFromStrategy(highestStrategy)) {
              return 'light-orange';
            }
            return '#D9DCE1';
          },
        };
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  onSliderChange(event) {
    const key: string = 'ap' + event;
    const strategy: InvestmentStrategyEnum = InvestmentStrategyEnum[key];
    this.interviewService.selectInvestmentStrategy(strategy);
  }

  getNumberFromStrategy(strategy: InvestmentStrategyEnum): number {
    return parseInt(strategy.toString().replace('AP', ''), 10);
  }
}
