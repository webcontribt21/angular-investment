import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  AssetIndustriesGetRequestAction,
  AssetIndustriesGetRequestFailAction,
  AssetIndustriesGetRequestSuccessAction,
} from './asset-industries-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadAssetIndustriesSuccessAction, LoadAssetIndustriesFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface AssetIndustriesGetRequestStateModel extends IRequestsNestedState {}

@State<AssetIndustriesGetRequestStateModel>({
  name: 'assetIndustriesGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class AssetIndustriesGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(AssetIndustriesGetRequestAction)
  assetIndustriesGetRequest(ctx: StateContext<AssetIndustriesGetRequestStateModel>, action: AssetIndustriesGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.assetIndustries).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new AssetIndustriesGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new AssetIndustriesGetRequestFailAction(error));
      }),
    );
  }

  @Action(AssetIndustriesGetRequestSuccessAction)
  assetIndustriesGetRequestSuccess(ctx: StateContext<AssetIndustriesGetRequestStateModel>, action: AssetIndustriesGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadAssetIndustriesSuccessAction(action.payload));
  }

  @Action(AssetIndustriesGetRequestFailAction)
  assetIndustriesGetRequestFail(ctx: StateContext<AssetIndustriesGetRequestStateModel>, action: AssetIndustriesGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadAssetIndustriesFailAction(action.payload));
  }
}
