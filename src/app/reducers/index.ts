// import { ActionReducer } from '@ngrx/store';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { userReducer, IUserState, getUserEntity } from './user.reducer';

import { environment } from '../../environments/environment';

export interface IAppState {
    user: IUserState;
}

export const reducers: ActionReducerMap<IAppState> = {
    user: userReducer
};

export function logger(reducer: ActionReducer<IAppState>): ActionReducer<IAppState> {
    return function(state: IAppState, action: any): IAppState {
      console.log('state', state);
      console.log('action', action);
      return reducer(state, action);
    };
  }

  export const metaReducers: MetaReducer<IAppState>[] = !environment.production
    ? [logger]
    : [];

// const productionReducer: ActionReducer<IAppState> = combineReducers(reducers);

// export function reducer(state: any, action: any): IAppState {
//     return productionReducer(state, action);
// }
// export const getArticleState = createFeatureSelector<ArticleState>('articleState');
export const getUserState = (state: IAppState) => state.user;
// export const getUserState = createFeatureSelector<IAppState>('user');
export const getLoggedInUser = createSelector(getUserState, getUserEntity);

