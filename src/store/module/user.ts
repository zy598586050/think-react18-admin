import { createSlice } from '@reduxjs/toolkit'
import storage from '@/utils/localStorage'

const { actions, reducer: UserReducer } = createSlice({
    name: 'user',
    initialState: {
        userInfo: JSON.parse(storage.getItem('userInfo') || '{}')
    },
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = {
                token: action.payload.token,
                name: action.payload.name,
                avatar: action.payload.avatar,
                auth_array: action.payload.auth_array,
                menu_tree: action.payload.menu_tree
            }
            storage.setItem('userInfo', JSON.stringify({
                token: action.payload.token,
                name: action.payload.name,
                avatar: action.payload.avatar,
                auth_array: action.payload.auth_array,
                menu_tree: action.payload.menu_tree
            }))
        },
        clearUserInfo(state, action) {
            state.userInfo = {}
            storage.setItem('userInfo', '')
        }
    }
})

export const { setUserInfo, clearUserInfo } = actions
export default UserReducer