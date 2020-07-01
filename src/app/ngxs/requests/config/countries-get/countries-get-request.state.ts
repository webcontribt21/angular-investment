import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  CountriesGetRequestAction,
  CountriesGetRequestFailAction,
  CountriesGetRequestSuccessAction,
} from './countries-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { LoadCountriesSuccessAction, LoadCountriesFailAction } from '../../../config/config.actions';
import { ConfigService } from '../../../../core/services';
import { ConfigTypeEnum } from '../../../../core/enums/config-type.enum';
import { Injectable } from '@angular/core';

export interface CountriesGetRequestStateModel extends IRequestsNestedState {}

@State<CountriesGetRequestStateModel>({
  name: 'countriesGetRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
@Injectable()
export class CountriesGetRequestState {
  constructor(private configService: ConfigService) {}

  @Action(CountriesGetRequestAction)
  countriesGetRequest(ctx: StateContext<CountriesGetRequestStateModel>, action: CountriesGetRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.configService.loadConfigRequest(ConfigTypeEnum.countries).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new CountriesGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new CountriesGetRequestFailAction(error));
      }),
    );
  }

  @Action(CountriesGetRequestSuccessAction)
  countriesGetRequestSuccess(ctx: StateContext<CountriesGetRequestStateModel>, action: CountriesGetRequestSuccessAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload,
    });
    ctx.dispatch(new LoadCountriesSuccessAction(action.payload));
  }

  @Action(CountriesGetRequestFailAction)
  countriesGetRequestFail(ctx: StateContext<CountriesGetRequestStateModel>, action: CountriesGetRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new LoadCountriesFailAction(action.payload));
  }
}
