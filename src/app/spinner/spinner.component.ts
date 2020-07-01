import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { SpinnerService } from '../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isLoading$: Observable<boolean> = this.spinnerService.isLoading$;

  constructor(private spinnerService: SpinnerService) {}
}
