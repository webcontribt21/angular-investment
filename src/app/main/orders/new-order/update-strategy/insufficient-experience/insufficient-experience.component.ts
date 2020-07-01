import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { InterviewService } from '../../../../../core/services';
import { InterviewExperienceStatus } from '../../../../../core/enums/experience-status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insufficient-experience',
  templateUrl: './insufficient-experience.component.html',
  styleUrls: ['./insufficient-experience.component.scss'],
})
export class InsufficientExperienceComponent {
  InterviewExperienceStatus = InterviewExperienceStatus;

  isButtonDisabled$: Observable<boolean>;

  acquireControl = new FormControl(null, {
    validators: [Validators.required],
  });

  constructor(private interviewService: InterviewService, private router: Router) {}

  isButtonDisabled() {
    return !this.acquireControl.dirty || this.acquireControl.status === 'INVALID';
  }

  submitAnswer() {
    if (this.acquireControl.value === InterviewExperienceStatus.WillAcquire) {
      this.interviewService.nextInterviewStep({
        insufficientExperience: this.acquireControl.value,
      });
    } else {
      this.interviewService.clearSelectedInterview();
      this.interviewService.clearSelectedInvestmentStrategy();
      this.router.navigate(['/', 'orders']);
    }
  }
}
