import { Selector } from '@ngxs/store';

import { UserState, UserStateModel } from './user.state';
import { User } from '../../core/models';

export class UserGetterState {
  @Selector([UserState])
  static getSelfData(state: UserStateModel): User {
    return state.entities[state.selfDataId];
  }
}
