import { createSlice } from '@reduxjs/toolkit'

const { actions, reducer: AppReducer } = createSlice({
    name: 'app',
    initialState: {
        collapsed: false, // 默认菜单不折叠
    },
    reducers: {
        openOrClose(state, action) {
            state.collapsed = action.payload
        }
    }
})

export const { openOrClose } = actions
export default AppReducer