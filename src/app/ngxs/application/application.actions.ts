import { LanguagesEnum } from '../../core/enums/i18n.enum';
import { MediaQuery } from '../../core/models';

const ActionTypes = {
  UPDATE_APP_MEDIA: `[Application] Update App Media`,
  SELECT_LANGUAGE: `[Application] Select Language`,
  SET_GREETING: `[Application] Set Greeting`,
};

export class UpdateAppMediaAction {
  static type = ActionTypes.UPDATE_APP_MEDIA;

  constructor(public payload: { type: MediaQuery; matches: boolean }) {}
}

export class SelectLanguageAction {
  static type = ActionTypes.SELECT_LANGUAGE;

  constructor(public payload: LanguagesEnum) {}
}

export class SetGreetingAction {
  static type = ActionTypes.SET_GREETING;

  constructor(public payload?: any) {}
}
