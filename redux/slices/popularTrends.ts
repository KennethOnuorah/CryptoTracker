import { createSlice } from '@reduxjs/toolkit'
import { CoinData } from '../../src/helpers/types'

interface initialPopularTrendsProps{
  isResponseReceived: boolean
  isAnotherRequestAllowed: boolean
  popularTrends: CoinData[]
}

const initialState: initialPopularTrendsProps = {
  isResponseReceived: false,
  isAnotherRequestAllowed: false,
  popularTrends: [],
}

export const popularTrends = createSlice({
  name: 'popularTrends',
  initialState,
  reducers: {
    setResponseReceived: (state, action): void => {
      state.isResponseReceived = action.payload
    },
    setPopularTrends: (state, action): void => {
      state.popularTrends = [...action.payload]
    }
  }
})

export const { setResponseReceived, setPopularTrends } = popularTrends.actions
export default popularTrends.reducer