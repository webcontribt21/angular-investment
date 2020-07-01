import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { InterviewService } from '../services';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewStrategyGuard implements CanActivate {
  constructor(private interviewService: InterviewService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.interviewService.selectedInterview$.pipe(
      map(res => {
        if (!res) {
          this.router.navigate(['/', 'orders']);
        }
        return !!res;
      }),
      take(1),
    );
  }
}
