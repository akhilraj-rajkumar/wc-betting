import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { MatchModel, ErrorModel } from '@app/models';
import * as match from '@app/actions';
import { tassign } from 'tassign';

export interface IMatchState {
    matches: MatchModel[],
    betAdded: MatchModel,
    betFailed: ErrorModel,
    betMatches: MatchModel[]
}

const defaultState: IMatchState = {matches: [], betAdded: null, betFailed: new ErrorModel(), betMatches: []};

export function matchReducer(state: IMatchState = defaultState, action: match.MatchActions): IMatchState {
    switch (action.type) {
        case match.MATCH_LIST_LOADED: {
            return tassign(state, { matches: action.payload });
        }
        case match.MATCH_BET_ADD_SUCCESS: {
            return tassign(state, { betAdded: action.payload });
        }
        case match.MATCH_BET_ADD_FAILED: {
            return tassign(state, { betFailed: action.payload });
        }
        case match.UPDATED_BETS_LIST: {
            return tassign(state, { betMatches: action.payload });
        }
        default: {
            return state;
        }
    }
}

export const getMatchesEntity = (state: IMatchState) => state.matches;
export const getBetSuccessEntity = (state: IMatchState) => state.betAdded;
export const getBetFailedEntity = (state: IMatchState) => state.betFailed;
export const getBetsEntity = (state: IMatchState) => state.betMatches;