import { configureStore, } from '@reduxjs/toolkit'

import currenciesReducer from './slices/currencies'
import colorThemeReducer from './slices/colorTheme'
import favoritesReducer from './slices/favorites'
import newsReducer from './slices/news'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state")
    if (!serializedState) return undefined
    else return JSON.parse(serializedState)
  } catch(err) {
    return undefined
  }
}

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state", serializedState)
  } catch(err) {
    console.log(err)
  }
}

const persistedStore = loadState()

export const store = configureStore({
  reducer: {
    currenciesReducer,
    colorThemeReducer,
    favoritesReducer,
    newsReducer
  },
  preloadedState: persistedStore
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch