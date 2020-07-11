import types from './actionTypes';
import { HYDRATE } from 'next-redux-wrapper'

const userReducer = (state = {}, action) => {
    switch(action.type) {
        case HYDRATE:
            console.log('hydratation');
            return {
                ...state,
                ...action.payload
            }
        case types.USER_LOGIN:
            console.log('Log in user');
            return {
                ...state,
                user: action.user
            }
        case types.USER_LOGOUT:
            console.log('Log out user');
            return {
                ...state,
                user: null
            }
        default:
            console.log(state);
            return state;
    }
}

export default userReducer;