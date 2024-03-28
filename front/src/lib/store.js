import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filters/filterSlice'

export const Store = () => {
    return configureStore({
        reducer: {
            filterReducer,
        }
    })
}