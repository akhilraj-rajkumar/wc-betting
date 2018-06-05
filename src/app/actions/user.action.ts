import { Action } from '@ngrx/store';
import { UserModel } from '@app/models';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export class UserLoginAction implements Action {
    readonly type = USER_LOGGED_IN;

    constructor(public payload: UserModel) {}
}

export class UserLogoutAction implements Action {
    readonly type = USER_LOGGED_OUT;
}

export type Actions = UserLoginAction | UserLogoutAction;
