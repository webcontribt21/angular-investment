import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  AssetLabelsGetRequestAction,
  AssetLabelsGetRequestFailAction,
  AssetLabelsGetRequestSuccessAction,
} from './asset-labels-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadAssetLabelsSuccessAction, LoadAssetLabelsFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface AssetLabelsGetRequestStateModel extends IRequestsNestedState {}

@State<AssetLabelsGetRequestStateModel>({
  name: 'assetLabelsGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class AssetLabelsGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(AssetLabelsGetRequestAction)
  assetLabelsGetRequest(ctx: StateContext<AssetLabelsGetRequestStateModel>, action: AssetLabelsGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.assetLabels).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new AssetLabelsGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new AssetLabelsGetRequestFailAction(error));
      }),
    );
  }

  @Action(AssetLabelsGetRequestSuccessAction)
  assetLabelsGetRequestSuccess(ctx: StateContext<AssetLabelsGetRequestStateModel>, action: AssetLabelsGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadAssetLabelsSuccessAction(action.payload));
  }

  @Action(AssetLabelsGetRequestFailAction)
  assetLabelsGetRequestFail(ctx: StateContext<AssetLabelsGetRequestStateModel>, action: AssetLabelsGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadAssetLabelsFailAction(action.payload));
  }
}
