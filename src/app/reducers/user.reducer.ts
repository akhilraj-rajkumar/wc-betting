import { Action } from '@ngrx/store';
import { UserModel } from '@app/auth';
import * as user from '@app/actions';

export interface IUserState {
    loggedInUser: UserModel;
}

const defaultState: IUserState = {loggedInUser: new UserModel()};

export function userReducer(state: IUserState = defaultState, action: user.Actions): IUserState {
    switch(action.type) {
        case user.USER_LOGGED_IN: {
            return Object.assign(defaultState, state, { loggedInUser: state.loggedInUser});
        }
        case user.USER_LOGGED_OUT: {
            return defaultState;
        }
        default: {
            return defaultState;
        }
    }
}
