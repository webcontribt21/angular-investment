import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

import { filter, pairwise } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { QUESTIONS_DATA, InterviewService } from '../../../../../../core/services/interview.service';
import { QuestionData } from '../interfaces/question-data.interface';

@Component({
  selector: 'app-question-5',
  templateUrl: './question-5.component.html',
  styleUrls: ['./question-5.component.scss'],
})
export class Question5Component implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  answerControl: AbstractControl = this.questionsData[0].answerControl;
  possibleValues = {
    none: 'FIN_SRV_NONE',
    advice: 'FIN_SRV_FIN_ADV',
    wealth: 'FIN_SRV_WLTH_MNGT',
    broker: 'FIN_SRV_ONLN_BRK',
  };

  constructor(private interviewService: InterviewService, @Inject(QUESTIONS_DATA) public questionsData: QuestionData[]) {}

  ngOnInit() {
    this.answerControl.setValidators([Validators.required, this.validateCheckbox.bind(this)]);

    this.subscriptions.push(
      this.answerControl.valueChanges
        .pipe(
          pairwise(),
          filter(([prev, current]) => {
            // filter if no value added
            const isNewValueAdded = !!current.find(val => !prev.includes(val));
            const isNoneIncluded = current.length > 1 && current.includes(this.possibleValues.none);
            return isNewValueAdded && isNoneIncluded;
          }),
        )
        .subscribe(([prev, current]) => {
          const newValue = current.find(val => !prev.includes(val));
          if (newValue === this.possibleValues.none && current.length > 1) {
            this.answerControl.patchValue([this.possibleValues.none]);
          } else if (this.answerControl.value.includes(this.possibleValues.none)) {
            this.answerControl.patchValue([newValue]);
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  validateCheckbox() {
    if (this.answerControl.value.includes(this.possibleValues.none) && this.answerControl.value.length > 1) {
      return { isWrong: true };
    }
    return null;
  }

  submitAnswer() {
    this.interviewService.nextInterviewStep();
  }
}
