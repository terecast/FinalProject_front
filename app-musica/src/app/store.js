import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import songReducer from '../features/listas/songSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        songs: songReducer
    }
})