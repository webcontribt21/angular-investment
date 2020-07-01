import { Selector } from '@ngxs/store';

import { AssetRegionsGetRequestStateModel, AssetRegionsGetRequestState } from './asset-industries-get-request.state';

export class AssetRegionsGetRequestGetterState {
  @Selector([AssetRegionsGetRequestState])
  static getAssetRegionsGetRequestState(state: AssetRegionsGetRequestStateModel): AssetRegionsGetRequestStateModel {
    return state;
  }
}
