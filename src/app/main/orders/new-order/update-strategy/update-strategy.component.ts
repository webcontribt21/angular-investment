import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationService } from '../../../../core/services';

@Component({
  selector: 'app-update-strategy',
  templateUrl: './update-strategy.component.html',
  styleUrls: ['./update-strategy.component.scss'],
})
export class UpdateStrategyComponent implements OnInit {
  isMobile$: Observable<boolean>;

  constructor(private appService: ApplicationService) {}
  ngOnInit(): void {
    this.isMobile$ = this.appService.isMobile$;
  }
}
