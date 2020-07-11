import userReducer from './userReducer'
import { createStore } from 'redux'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = (/* can receive context */) => { createStore(userReducer); }

export const wrapper = createWrapper(makeStore, { debug: true });