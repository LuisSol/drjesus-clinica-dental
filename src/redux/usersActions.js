import types from './actionTypes'

export const loginUser = (user) => {
    return { type: types.USER_LOGIN, user }
}

export const logoutUser = () => {
    return { type: types.USER_LOGOUT }
}