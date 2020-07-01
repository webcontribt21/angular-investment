import { Selector } from '@ngxs/store';

import { AssetClassesGetRequestStateModel, AssetClassesGetRequestState } from './asset-classes-get-request.state';

export class AssetClassesGetRequestGetterState {
  @Selector([AssetClassesGetRequestState])
  static getAssetClassesGetRequestState(state: AssetClassesGetRequestStateModel): AssetClassesGetRequestStateModel {
    return state;
  }
}
