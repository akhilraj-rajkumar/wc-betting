import { Action } from '@ngrx/store';
import { MatchModel } from '@app/models';

export const MATCH_LIST_LOADED = 'MATCH_LIST_LOADED';

export class MatchesListedAction implements Action {
    readonly type = MATCH_LIST_LOADED;

    constructor(public payload: MatchModel[]) {}
}

export type MatchActions = MatchesListedAction;