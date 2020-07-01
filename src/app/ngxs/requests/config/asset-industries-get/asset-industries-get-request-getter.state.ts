import { Selector } from '@ngxs/store';

import { AssetIndustriesGetRequestStateModel, AssetIndustriesGetRequestState } from './asset-industries-get-request.state';

export class AssetIndustriesGetRequestGetterState {
  @Selector([AssetIndustriesGetRequestState])
  static getAssetIndustriesGetRequestState(state: AssetIndustriesGetRequestStateModel): AssetIndustriesGetRequestStateModel {
    return state;
  }
}
