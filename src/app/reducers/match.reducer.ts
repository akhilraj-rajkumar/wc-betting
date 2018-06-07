import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { MatchModel } from '@app/models';
import * as user from '@app/actions';
import { tassign } from 'tassign';

export interface IMatchState {
    matches: MatchModel[];
}

const defaultState: IMatchState = {matches: []};

export function matchReducer(state: IMatchState = defaultState, action: user.MatchActions): IMatchState {
    switch (action.type) {
        case user.MATCH_LIST_LOADED: {
            return tassign(state, { matches: action.payload });
        }
        default: {
            return state;
        }
    }
}

export const getMatchesEntity = (state: IMatchState) => state.matches;