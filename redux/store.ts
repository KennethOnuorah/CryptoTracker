import { configureStore, } from '@reduxjs/toolkit'

import currenciesReducer from './slices/currencies'
import colorThemeReducer from './slices/colorTheme'
import favoritesReducer from './slices/favorites'

export const store = configureStore({
  reducer: {
    currenciesReducer,
    colorThemeReducer,
    favoritesReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch