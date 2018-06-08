import { Action } from '@ngrx/store';
import { MatchModel, ErrorModel } from '@app/models';

export const MATCH_LIST_LOADED = 'MATCH_LIST_LOADED';
export const MATCH_BET_ADD_SUCCESS = 'MATCH_BET_ADD_SUCCESS';
export const MATCH_BET_ADD_FAILED = 'MATCH_BET_ADD_FAILED';

export class MatchesListedAction implements Action {
    readonly type = MATCH_LIST_LOADED;

    constructor(public payload: MatchModel[]) {}
}

export class BetAddedSuccessAction implements Action {
    readonly type = MATCH_BET_ADD_SUCCESS;

    constructor(public payload: any) {}
}

export class BetAddedFailedAction implements Action {
    readonly type = MATCH_BET_ADD_FAILED;

    constructor(public payload: ErrorModel) {}
}

export type MatchActions = MatchesListedAction | BetAddedSuccessAction | BetAddedFailedAction;