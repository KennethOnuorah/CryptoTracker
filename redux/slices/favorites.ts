import { createSlice } from '@reduxjs/toolkit'

interface initialFavoritesProps{
  namesOfFavorites: string[]
}

const initialState: initialFavoritesProps = {
  namesOfFavorites: [],
}

export const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setNamesOfFavorites: (state, action) : void => {
      state.namesOfFavorites = [...action.payload]
    },
  }
})

export const { setNamesOfFavorites } = favorites.actions
export default favorites.reducer