import { Action } from '@ngrx/store';
import { UserModel, ErrorModel, LeaderModel, UserProgressModel } from '@app/models';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const LEADERS_LOADED = 'LEADERS_LOADED';
export const USER_PROGRESS_LOADED = 'USER_PROGRESS_LOADED';

export class UserLoginAction implements Action {
    readonly type = USER_LOGGED_IN;

    constructor(public payload: UserModel) {}
}

export class UserLogoutAction implements Action {
    readonly type = USER_LOGGED_OUT;
}

export class UserLoginFailedAction implements Action {
    readonly type = USER_LOGIN_FAILED;

    constructor(public payload: ErrorModel) {}
}

export class LeadersLoadedAction implements Action {
    readonly type = LEADERS_LOADED;

    constructor(public payload: LeaderModel[]) {}
}

export class UserProgressLoadedAction implements Action {
    readonly type = USER_PROGRESS_LOADED;

    constructor(public payload: UserProgressModel[]) {}
}

export type Actions = UserLoginAction | UserLogoutAction
 | UserLoginFailedAction | LeadersLoadedAction
 | UserProgressLoadedAction;
