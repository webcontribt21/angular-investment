import { AbstractControl } from '@angular/forms';

import { InterviewAnswer, InterviewQuestion } from '../../../../../../core/models';

export interface QuestionData extends InterviewQuestion {
  answers: InterviewAnswer[];
  answerControl: AbstractControl;
}
