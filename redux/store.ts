import { configureStore } from '@reduxjs/toolkit'
import popularTrendsReducer from './slices/popularTrends'
import colorThemeReducer from './slices/colorTheme'

export const store = configureStore({
  reducer: {
    popularTrendsReducer,
    colorThemeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch