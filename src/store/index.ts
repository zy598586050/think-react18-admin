

import { configureStore } from '@reduxjs/toolkit'
import User from './module/user'
import App from './module/app'

export default configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        user: User,
        app: App
    }
})