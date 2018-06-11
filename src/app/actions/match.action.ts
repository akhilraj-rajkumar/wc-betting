import { Action } from '@ngrx/store';
import { MatchModel, ErrorModel, BetModel } from '@app/models';

export const MATCH_LIST_LOADED = 'MATCH_LIST_LOADED';
export const MATCH_BET_ADD_SUCCESS = 'MATCH_BET_ADD_SUCCESS';
export const MATCH_BET_ADD_FAILED = 'MATCH_BET_ADD_FAILED';
export const UPDATED_BETS_LIST = 'UPDATED_BETS_LIST';
export const MATCH_ALL_BETS_LOADED = 'MATCH_ALL_BETS_LOADED';

export class MatchesListedAction implements Action {
    readonly type = MATCH_LIST_LOADED;

    constructor(public payload: MatchModel[]) {}
}

export class BetAddedSuccessAction implements Action {
    readonly type = MATCH_BET_ADD_SUCCESS;

    constructor(public payload: MatchModel) {}
}

export class BetAddedFailedAction implements Action {
    readonly type = MATCH_BET_ADD_FAILED;

    constructor(public payload: ErrorModel) {}
}

export class MatchBetsListedAction implements Action {
    readonly type = UPDATED_BETS_LIST;

    constructor(public payload: MatchModel[]) {}
}

export class MatchAllBetsLoadedAction implements Action {
    readonly type = MATCH_ALL_BETS_LOADED;

    constructor(public payload: BetModel) {}
}

export type MatchActions = MatchesListedAction | BetAddedSuccessAction | BetAddedFailedAction | MatchBetsListedAction | MatchAllBetsLoadedAction;