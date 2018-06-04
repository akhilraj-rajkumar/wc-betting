import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { userReducer, IUserState } from './user.reducer';

export interface IAppState {
    user: IUserState;
}

const reducers = {
    user: userReducer
}

const productionReducer: ActionReducer<IAppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return productionReducer(state, action);
  }