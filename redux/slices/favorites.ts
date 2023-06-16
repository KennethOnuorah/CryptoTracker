import { createSlice } from '@reduxjs/toolkit'

interface initialFavoritesProps{
  favoritesList: string[]
}

const initialState: initialFavoritesProps = {
  favoritesList: [],
}

export const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoritesList: (state, action) : void => {
      state.favoritesList = action.payload
    },
  }
})

export const { setFavoritesList } = favorites.actions
export default favorites.reducer