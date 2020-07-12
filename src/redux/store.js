import userReducer from './userReducer'
import { createStore } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import { auth } from '../utils/firebase'
import { loginUser, logoutUser } from './usersActions'

const makeStore = (/* can receive context */) => { 
    const store = createStore(userReducer);
    auth.onAuthStateChanged((user) => {
        if(user) {
            // log in
            store.dispatch( loginUser(user) )
        }
        else {
            // log out
            store.dispatch( logoutUser() )
        }
    });
    return store;
}

export const wrapper = createWrapper(makeStore);