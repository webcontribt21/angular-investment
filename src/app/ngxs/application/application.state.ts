import { Action, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import { Moment } from 'moment';
import * as _ from 'lodash';

import { SelectLanguageAction, SetGreetingAction, UpdateAppMediaAction } from './application.actions';
import { LanguagesEnum } from '../../core/enums/i18n.enum';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

export interface AppMediaStateModel {
  [type: string]: boolean;
}

export interface ApplicationStateModel {
  appMedia: AppMediaStateModel;
  selectedLang: LanguagesEnum;
  greeting: string;
}

@State<ApplicationStateModel>({
  name: 'application',
  defaults: {
    appMedia: {},
    selectedLang: LanguagesEnum.en,
    greeting: null,
  },
})
@Injectable()
export class ApplicationState implements NgxsOnInit {
  constructor(private store: Store, private translateService: TranslateService, private cookieService: CookieService) {}

  ngxsOnInit(ctx: StateContext<ApplicationStateModel>) {}

  @Action(UpdateAppMediaAction)
  setAppMedia(ctx: StateContext<ApplicationStateModel>, action: UpdateAppMediaAction) {
    ctx.patchState({
      appMedia: {
        ...ctx.getState().appMedia,
        [action.payload.type.name]: action.payload.matches,
      },
    });
  }

  @Action(SelectLanguageAction)
  selectLanguage(ctx: StateContext<ApplicationStateModel>, action: SelectLanguageAction) {
    const selectedLanguage: LanguagesEnum = action.payload;
    const websiteDomain: string = environment.websiteDomain.replace('https://www', '');
    this.translateService.use(selectedLanguage);
    this.cookieService.set('****_locale', selectedLanguage, undefined, '/', websiteDomain);
    moment.locale(selectedLanguage);
    ctx.patchState({
      selectedLang: selectedLanguage,
    });
  }

  @Action(SetGreetingAction)
  setGreeting(ctx: StateContext<ApplicationStateModel>, action: SetGreetingAction) {
    const setTime = (hours: number, mins = 0, secs = 0, month?: number, day?: number): Moment => {
      const date = moment()
        .set('hours', hours)
        .set('minute', mins)
        .set('second', secs);
      if (month) {
        date.set('month', month - 1);
      }
      if (day) {
        date.set('date', day);
      }
      return date;
    };

    const currentDate = moment();
    let greetingKey = 'OVERVIEW_PAGE.GREETING.';
    switch (true) {
      // view nice to see you or welcome back from time to time
      case _.random(10) > 7:
        greetingKey += _.random(10) > 5 ? 'NICE_TO_SEE_YOU' : 'WELCOME_BACK';
        break;
      case currentDate >= setTime(0, 0, 1, 12, 25) && currentDate <= setTime(23, 59, 59, 12, 26):
        greetingKey += 'MERRY_CHRISTMAS';
        break;
      case currentDate >= setTime(0, 0, 1, 1, 1) && currentDate <= setTime(23, 59, 59, 1, 3):
        greetingKey += 'HAPPY_NEW_YEAR';
        break;
      case currentDate >= setTime(0, 0, 1, 10, 30) && currentDate <= setTime(23, 59, 59, 10, 30):
        greetingKey += 'TODAY_IS_WORLD_SAVINGS_DAY';
        break;
      case currentDate >= setTime(1) && currentDate < setTime(10):
        greetingKey += 'GOOD_MORNING';
        break;
      case currentDate >= setTime(10) && currentDate < setTime(12):
        greetingKey += 'WELCOME_BACK';
        break;
      case currentDate >= setTime(12) && currentDate < setTime(17):
        greetingKey += 'GOOD_AFTERNOON';
        break;
      case currentDate >= setTime(17) || currentDate < setTime(1):
        greetingKey += 'GOOD_EVENING';
        break;
      default:
        greetingKey += 'NICE_TO_SEE_YOU';
    }

    ctx.patchState({
      greeting: greetingKey,
    });
  }
}
