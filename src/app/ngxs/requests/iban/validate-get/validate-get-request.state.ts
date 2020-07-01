import { Action, State, StateContext } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import {
  IbanValidateGetRequestAction,
  IbanValidateGetRequestFailAction,
  IbanValidateGetRequestSuccessAction,
} from './validate-get-request.actions';
import { IRequestsNestedState } from '../../requests.interface';
import { ValidateIbanSuccessAction, ValidateIbanFailAction } from '../../../iban/iban.actions';
import { requestInitialState, requestLoadingState, requestSuccessState, requestFailState } from '../../../utils';
import { IbanService } from '../../../../core/services/iban.service';
import { Injectable } from '@angular/core';

export interface IbanValidateGetRequestStateModel extends IRequestsNestedState {}

@State<IbanValidateGetRequestStateModel>({
  name: 'ibanValidateGetRequestState',
  defaults: requestInitialState,
})
@Injectable()
export class IbanValidateGetRequestState {
  constructor(private ibanService: IbanService) {}

  @Action(IbanValidateGetRequestAction)
  ibanValidateGetRequest(ctx: StateContext<IbanValidateGetRequestStateModel>, action: IbanValidateGetRequestAction) {
    ctx.patchState(requestLoadingState);
    return this.ibanService.validationRequest(action.payload).pipe(
      switchMap((res: any) => {
        return ctx.dispatch(new IbanValidateGetRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new IbanValidateGetRequestFailAction(error));
      }),
    );
  }

  @Action(IbanValidateGetRequestSuccessAction)
  ibanValidateGetRequestSuccess(ctx: StateContext<IbanValidateGetRequestStateModel>, action: IbanValidateGetRequestSuccessAction) {
    ctx.patchState(requestSuccessState(action.payload));
    ctx.dispatch(new ValidateIbanSuccessAction(action.payload));
  }

  @Action(IbanValidateGetRequestFailAction)
  ibanValidateGetRequestFail(ctx: StateContext<IbanValidateGetRequestStateModel>, action: IbanValidateGetRequestFailAction) {
    ctx.patchState(requestFailState(action.payload));
    ctx.dispatch(new ValidateIbanFailAction(action.payload));
  }
}
