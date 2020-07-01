import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  AssetRegionsGetRequestAction,
  AssetRegionsGetRequestFailAction,
  AssetRegionsGetRequestSuccessAction,
} from './asset-industries-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadAssetRegionsSuccessAction, LoadAssetRegionsFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface AssetRegionsGetRequestStateModel extends IRequestsNestedState {}

@State<AssetRegionsGetRequestStateModel>({
  name: 'assetRegionsGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class AssetRegionsGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(AssetRegionsGetRequestAction)
  assetRegionsGetRequest(ctx: StateContext<AssetRegionsGetRequestStateModel>, action: AssetRegionsGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.assetRegions).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new AssetRegionsGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new AssetRegionsGetRequestFailAction(error));
      }),
    );
  }

  @Action(AssetRegionsGetRequestSuccessAction)
  assetRegionsGetRequestSuccess(ctx: StateContext<AssetRegionsGetRequestStateModel>, action: AssetRegionsGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadAssetRegionsSuccessAction(action.payload));
  }

  @Action(AssetRegionsGetRequestFailAction)
  assetRegionsGetRequestFail(ctx: StateContext<AssetRegionsGetRequestStateModel>, action: AssetRegionsGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadAssetRegionsFailAction(action.payload));
  }
}
