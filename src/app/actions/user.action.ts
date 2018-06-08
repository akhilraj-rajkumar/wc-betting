import { Action } from '@ngrx/store';
import { UserModel, ErrorModel } from '@app/models';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

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

export type Actions = UserLoginAction | UserLogoutAction | UserLoginFailedAction;
