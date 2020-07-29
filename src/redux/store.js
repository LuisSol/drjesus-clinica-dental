import userReducer from './userReducer'
import { createStore } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import { setCookie, destroyCookie } from 'nookies'

import { auth } from '../utils/firebase'
import { loginUser, logoutUser } from './usersActions'

const cookieName = 'auth'

const makeStore = (ctx) => { 
    const store = createStore(userReducer);
    auth.onAuthStateChanged(async (user) => {
        if(user) {
            // log in
            const { xa, photoURL, uid, displayName, email, refreshToken } = user;
            setCookie(ctx, cookieName, JSON.stringify({ xa, uid, refreshToken }), { maxAge: 60 * 60 * 24, path: '/' });
            store.dispatch( loginUser({ photoURL, uid, displayName, email}) );            
        }
        else {
            // log out
            destroyCookie(ctx, cookieName);
            store.dispatch( logoutUser() );
        }
    });
    return store;
}

export const wrapper = createWrapper(makeStore);