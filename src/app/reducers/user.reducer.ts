import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { UserModel } from '@app/models';
import * as user from '@app/actions';
import { tassign } from 'tassign';

export interface IUserState {
    loggedInUser: UserModel;
}

const defaultState: IUserState = {loggedInUser: new UserModel()};

export function userReducer(state: IUserState = defaultState, action: user.Actions): IUserState {
    switch (action.type) {
        case user.USER_LOGGED_IN: {
            return tassign(state, { loggedInUser: action.payload });
        }
        case user.USER_LOGGED_OUT: {
            return state;
        }
        default: {
            return state;
        }
    }
}

export const getUserEntity = (state: IUserState) => state.loggedInUser;
