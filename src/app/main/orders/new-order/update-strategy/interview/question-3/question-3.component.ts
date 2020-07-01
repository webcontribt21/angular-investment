import { Component, Inject, OnInit } from '@angular/core';

import { QUESTIONS_DATA, InterviewService } from '../../../../../../core/services/interview.service';
import { QuestionData } from '../interfaces/question-data.interface';

@Component({
  selector: 'app-question-3',
  templateUrl: './question-3.component.html',
  styleUrls: ['./question-3.component.scss'],
})
export class Question3Component implements OnInit {
  constructor(private interviewService: InterviewService, @Inject(QUESTIONS_DATA) public questionsData: QuestionData[]) {}

  ngOnInit() {}

  submitAnswer() {
    this.interviewService.nextInterviewStep();
  }
}
