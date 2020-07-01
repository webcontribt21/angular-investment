import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationService, ConfigService, InterviewService } from '../../../../../core/services';
import { InterviewAnswer, InterviewQuestion } from '../../../../../core/models';
import { QuestionData } from './interfaces/question-data.interface';
import { QUESTIONS_DATA } from '../../../../../core/services/interview.service';
import { InterviewExperienceStatus } from '../../../../../core/enums/experience-status.enum';
import { Question1Component } from './question-1/question-1.component';
import { Question2Component } from './question-2/question-2.component';
import { Question3Component } from './question-3/question-3.component';
import { Question4Component } from './question-4/question-4.component';
import { Question5Component } from './question-5/question-5.component';
import { Question6Component } from './question-6/question-6.component';
import { InsufficientExperienceComponent } from '../insufficient-experience/insufficient-experience.component';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss'],
})
export class InterviewComponent implements OnInit, OnDestroy {
  isMobile$: Observable<boolean> = this.applicationService.isMobile$;
  interviewStep$: Observable<number> = this.interviewService.interviewStep$;
  insufficientExperience$: Observable<InterviewExperienceStatus> = this.interviewService.insufficientExperience$;

  form: FormGroup;

  questionPages = [
    {
      codes: ['IMP_REG_SAVING'],
      component: Question1Component,
    },
    {
      codes: ['ACC_DEC'],
      component: Question2Component,
    },
    {
      codes: ['INVEST_YEARS'],
      component: Question3Component,
    },
    // 'EXP' question contains 6 questions
    // TODO: remove if not necessary
    // {
    //   codes: 'EXP',
    // },
    {
      codes: [
        'ASSET_CLASS_OVERNIGHT_MNY_ACC',
        'ASSET_CLASS_GOV_BONDS',
        'ASSET_CLASS_STOCKS',
        'ASSET_CLASS_ETF',
        'ASSET_CLASS_CORP_BONDS',
        'ASSET_CLASS_COMMODITIES',
      ],
      component: Question4Component,
    },
    {
      codes: ['KNOWN_FIN_SRV'],
      component: Question5Component,
    },
    {
      codes: ['MONTHLY_NET_INCOME', 'MONTHLY_SAVING', 'DISPOSABLE_SAVING'],
      component: Question6Component,
    },
    {
      codes: ['INSUFFICIENT_EXPERIENCE'],
      component: InsufficientExperienceComponent,
    },
  ];

  questionPageList$: Observable<any[]>;

  constructor(
    private applicationService: ApplicationService,
    private configService: ConfigService,
    private interviewService: InterviewService,
    private injector: Injector,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      questions: new FormArray([this.newQuestionFormGroup({ question: 'INVEST_GOAL', type: 'STRING', answer: 'INVEST_GOAL_WEALTH' })]),
    });

    this.questionPageList$ = combineLatest(
      this.configService.interviewQuestions$,
      this.configService.interviewAnswers$,
      this.interviewStep$,
      this.insufficientExperience$,
    ).pipe(
      map(([inviewQuestions, inviewAnswers, currentQuestionIndex, experience]) => {
        return this.questionPages.map((questionPage, index) => {
          // get current page questions
          const pageQuestions: InterviewQuestion[] = questionPage.codes.map(code => {
            return inviewQuestions.find(que => que.code === code);
          });

          let questionsData: QuestionData[];
          let active: boolean;
          if (questionPage.codes[0] === 'INSUFFICIENT_EXPERIENCE') {
            questionsData = null;
            active = experience === InterviewExperienceStatus.Requested;
          } else {
            active =
              currentQuestionIndex === index + 1 &&
              (experience === InterviewExperienceStatus.Default || experience === InterviewExperienceStatus.WillAcquire);
            questionsData = pageQuestions.map((question: InterviewQuestion) => {
              // add answers to each page question
              const answers: InterviewAnswer[] = question.possibleAnswers.map(answer => {
                return inviewAnswers.find(ans => ans.code === answer);
              });

              // add question to the form if not added yet
              const questionsControl: FormArray = this.form.get('questions') as FormArray;
              const currentFormArrayValue: any[] = questionsControl.getRawValue();
              // get current question index in form array
              const questionIndex: number = currentFormArrayValue.findIndex(res => {
                return res.question === question.code;
              });
              let fg: FormGroup = questionsControl.at(questionIndex) as FormGroup;
              if (questionIndex < 0) {
                fg = this.newQuestionFormGroup({ question: question.code, type: question.type });
                questionsControl.push(fg);
              }

              // add answer control to inject it into question page component
              const questionData: QuestionData = {
                ...question,
                answers,
                answerControl: fg.get(question.type === 'ARRAY' ? 'answers' : 'answer'),
              };
              return questionData;
            });
          }

          return {
            ...questionPage,
            active,
            // injector for dynamically rendered component
            injectedData: Injector.create({
              providers: [{ provide: QUESTIONS_DATA, useValue: questionsData }],
              parent: this.injector,
            }),
          };
        });
      }),
    );
  }

  ngOnDestroy() {
    this.interviewService.resetInterviewStep();
  }

  newQuestionFormGroup(data: { question: string; type: string; answer?: any }): FormGroup {
    const field: string = data.type === 'ARRAY' ? 'answers' : 'answer';
    return new FormGroup({
      question: new FormControl(data.question, {
        validators: [Validators.required],
      }),
      type: new FormControl(data.type, {
        validators: [Validators.required],
      }),
      [field]: new FormControl(data.answer || '', {
        validators: [Validators.required],
      }),
    });
  }

  previousQuestion() {
    this.interviewService.prevInterviewStep();
  }
}
