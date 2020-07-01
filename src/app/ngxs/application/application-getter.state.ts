import { Selector } from '@ngxs/store';

import { ApplicationState, ApplicationStateModel } from './application.state';
import { LanguagesEnum } from '../../core/enums/i18n.enum';

export class ApplicationGetterState {
  @Selector([ApplicationState])
  static getAppState(state: ApplicationStateModel): ApplicationStateModel {
    return state;
  }

  @Selector([ApplicationState])
  static getAppMedia(state: ApplicationStateModel): { [type: string]: boolean } {
    return state.appMedia;
  }

  @Selector([ApplicationState])
  static getSelectedLang(state: ApplicationStateModel): LanguagesEnum {
    return state.selectedLang;
  }

  @Selector([ApplicationState])
  static getGreeting(state: ApplicationStateModel): string {
    return state.greeting;
  }
}
