import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  AssetClassesGetRequestAction,
  AssetClassesGetRequestFailAction,
  AssetClassesGetRequestSuccessAction,
} from './asset-classes-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadAssetClassesSuccessAction, LoadAssetClassesFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface AssetClassesGetRequestStateModel extends IRequestsNestedState {}

@State<AssetClassesGetRequestStateModel>({
  name: 'assetClassesGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class AssetClassesGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(AssetClassesGetRequestAction)
  assetClassesGetRequest(ctx: StateContext<AssetClassesGetRequestStateModel>, action: AssetClassesGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.assetClasses).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new AssetClassesGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new AssetClassesGetRequestFailAction(error));
      }),
    );
  }

  @Action(AssetClassesGetRequestSuccessAction)
  assetClassesGetRequestSuccess(ctx: StateContext<AssetClassesGetRequestStateModel>, action: AssetClassesGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadAssetClassesSuccessAction(action.payload));
  }

  @Action(AssetClassesGetRequestFailAction)
  assetClassesGetRequestFail(ctx: StateContext<AssetClassesGetRequestStateModel>, action: AssetClassesGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadAssetClassesFailAction(action.payload));
  }
}
