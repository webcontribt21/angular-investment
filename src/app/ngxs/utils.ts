import { IRequestsNestedState } from './requests/requests.interface';

export function updateEntities(payload, entityModel?) {
  if (!Array.isArray(payload)) {
    payload = [payload];
  }
  const entities: { [key: string]: any } = payload.reduce((acc: { [id: string]: any }, entity: any) => {
    return { ...acc, [entity.id]: entityModel ? new entityModel(entity) : entity };
  }, {});
  const ids: string[] = payload.map(a => a.id);
  return { ids, entities };
}

export const requestInitialState: IRequestsNestedState = {
  loading: false,
  loaded: false,
  status: '',
  data: null,
};

export const requestLoadingState: IRequestsNestedState = {
  loading: true,
  loaded: false,
  status: '',
  data: null,
};

export const requestSuccessState = (payload): IRequestsNestedState => {
  return {
    loading: false,
    loaded: true,
    status: 'success',
    data: payload,
  };
};

export const requestFailState = (payload): IRequestsNestedState => {
  return {
    loading: false,
    loaded: true,
    status: 'fail',
    data: payload,
  };
};
