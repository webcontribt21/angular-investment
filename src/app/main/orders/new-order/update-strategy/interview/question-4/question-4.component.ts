import { Component, Inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { QUESTIONS_DATA } from '../../../../../../core/services/interview.service';
import { ApplicationService, ConfigService, I18nService, InterviewService } from '../../../../../../core/services';
import { InterviewQuestion } from '../../../../../../core/models';

import { QuestionData } from '../interfaces/question-data.interface';
import { InterviewExperienceStatus } from 'src/app/core/enums/experience-status.enum';

const NONE = 'EXP_LVL_NONE';

@Component({
  selector: 'app-question-4',
  templateUrl: './question-4.component.html',
  styleUrls: ['./question-4.component.scss'],
})
export class Question4Component implements OnInit {
  currentQuestion$: Observable<InterviewQuestion>;
  isTabletsHorizontal$: Observable<boolean>;
  selectedLang$: Observable<string>;

  constructor(
    private interviewService: InterviewService,
    private configService: ConfigService,
    private appService: ApplicationService,
    private i18nService: I18nService,
    @Inject(QUESTIONS_DATA) public questionsData: QuestionData[],
  ) {}

  ngOnInit() {
    this.selectedLang$ = this.i18nService.selectedLang$;
    this.isTabletsHorizontal$ = this.appService.isTabletsHorizontal$;
    this.currentQuestion$ = this.configService.interviewQuestions$.pipe(
      map((interviewQuestions: InterviewQuestion[]) => {
        const currentQuestion: InterviewQuestion = interviewQuestions.find(question => {
          return question.code === 'EXP';
        });
        return currentQuestion;
      }),
    );
  }

  isButtonDisabled() {
    return !!this.questionsData.find(question => question.answerControl.invalid);
  }

  submitAnswer() {
    const valid = this.questionsData.map(question => question.answerControl.value).filter((v: string) => v !== NONE).length > 0;
    if (valid) {
      this.interviewService.nextInterviewStep();
    } else {
      this.interviewService.nextInterviewStep({
        insufficientExperience: InterviewExperienceStatus.Requested,
      });
    }
  }
}
