import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { UserModel, ErrorModel, LeaderModel, UserProgressModel } from '@app/models';
import * as user from '@app/actions';
import { tassign } from 'tassign';

export interface IUserState {
    loggedInUser: UserModel;
    loginFailed: ErrorModel;
    leaders: LeaderModel[];
    userProgress: UserProgressModel[];
}

const defaultState: IUserState = {loggedInUser: new UserModel(),
    loginFailed: new ErrorModel(),
    leaders: [],
    userProgress: []};

export function userReducer(state: IUserState = defaultState, action: user.Actions): IUserState {
    switch (action.type) {
        case user.USER_LOGGED_IN: {
            return tassign(state, { loggedInUser: action.payload });
        }
        case user.USER_LOGGED_OUT: {
            return state;
        }
        case user.USER_LOGIN_FAILED: {
            return tassign(state, { loginFailed: action.payload });
        }
        case user.LEADERS_LOADED: {
            return tassign(state, { leaders: action.payload });
        }
        case user.USER_PROGRESS_LOADED: {
            return tassign(state, { userProgress: action.payload });
        }
        default: {
            return state;
        }
    }
}

export const getUserEntity = (state: IUserState) => state.loggedInUser;
export const getLeadersEntity = (state: IUserState) => state.leaders;
export const getUserProgressEntity = (state: IUserState) => state.userProgress;
