import { Component, Inject, OnInit } from '@angular/core';

import { InterviewService, QUESTIONS_DATA } from '../../../../../../core/services/interview.service';
import { QuestionData } from '../interfaces/question-data.interface';

@Component({
  selector: 'app-question-1',
  templateUrl: './question-1.component.html',
  styleUrls: ['./question-1.component.scss'],
})
export class Question1Component implements OnInit {
  question: QuestionData = this.questionsData[0];

  constructor(private interviewService: InterviewService, @Inject(QUESTIONS_DATA) public questionsData: QuestionData[]) {}

  ngOnInit() {}

  submitAnswer() {
    this.interviewService.nextInterviewStep();
  }
}
