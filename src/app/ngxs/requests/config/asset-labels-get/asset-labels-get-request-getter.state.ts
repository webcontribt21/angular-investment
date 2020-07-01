import { Selector } from '@ngxs/store';

import { AssetLabelsGetRequestStateModel, AssetLabelsGetRequestState } from './asset-labels-get-request.state';

export class AssetLabelsGetRequestGetterState {
  @Selector([AssetLabelsGetRequestState])
  static getAssetLabelsGetRequestState(state: AssetLabelsGetRequestStateModel): AssetLabelsGetRequestStateModel {
    return state;
  }
}
