import { createSlice } from '@reduxjs/toolkit'
import { CoinData } from '../../src/helpers/types'

interface initialFavoritesProps{
  isResponseReceived: boolean,
  favorites: CoinData[]
}

const initialState: initialFavoritesProps = {
  isResponseReceived: false,
  favorites: []
}

export const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {

  }
})

export const {} = favorites.actions
export default favorites.reducer