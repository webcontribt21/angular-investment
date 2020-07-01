import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, Validators, ValidationErrors } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { QUESTIONS_DATA, InterviewService } from '../../../../../../core/services/interview.service';
import { ApeironService } from '../../../../../../core/services';
import { QuestionData } from '../interfaces/question-data.interface';

@Component({
  selector: 'app-question-6',
  templateUrl: './question-6.component.html',
  styleUrls: ['./question-6.component.scss'],
})
export class Question6Component implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  isButtonDisabled$: Observable<boolean>;

  portfolio$ = this.apeironService.portfolio$;

  constructor(
    private interviewService: InterviewService,
    private apeironService: ApeironService,
    @Inject(QUESTIONS_DATA) public questionsData: QuestionData[],
  ) {}

  ngOnInit() {
    this.isButtonDisabled$ = this.interviewService.addInterviewForm$.pipe(
      filter(res => res.dirty),
      map(form => {
        return form.status === 'INVALID' || form.status === 'PENDING';
      }),
    );

    this.questionsData.forEach(question => {
      question.answerControl.patchValue(null);
      question.answerControl.setValidators([
        Validators.required,
        Validators.min(0),
        Validators.max(1000000000),
        ...(question.code === 'MONTHLY_SAVING' ? [this.monthlySavingsValidator.bind(this)] : []),
      ]);
      question.answerControl.setAsyncValidators([
        ...(question.code === 'DISPOSABLE_SAVING' ? [this.disposableSavingsValidator.bind(this)] : []),
      ]);
    });

    this.subscriptions.push(
      this.questionsData
        .find(q => q.code === 'MONTHLY_NET_INCOME')
        .answerControl.valueChanges.subscribe(() => {
          this.questionsData.find(q => q.code === 'MONTHLY_SAVING').answerControl.updateValueAndValidity();
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  monthlySavingsValidator(control: AbstractControl): ValidationErrors | null {
    const quest: QuestionData = this.questionsData.find(que => que.code === 'MONTHLY_NET_INCOME');
    const monthlyIncome: number = quest.answerControl.value;
    return monthlyIncome && control.value > monthlyIncome ? { isMoreThanMonthlyIncome: true } : null;
  }

  disposableSavingsValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.portfolio$.pipe(
      take(1),
      map(portfolio => portfolio.currentBalance),
      map(balance => {
        return control.value < Math.floor(balance) ? { invalidDisposableSaving: { min: balance, actual: control.value } } : null;
      }),
    );
  }

  submitAnswer() {
    this.interviewService.saveInterview();
  }
}
