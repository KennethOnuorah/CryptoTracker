import { createSlice } from '@reduxjs/toolkit'
import { CoinData } from '../../src/helpers/types'

interface initalCurrenciesProps{
  isResponseReceived: boolean
  data: CoinData[]
}

const initialState: initalCurrenciesProps = {
  isResponseReceived: false,
  data: [],
}

export const currencies = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setResponseReceived: (state, action): void => {
      state.isResponseReceived = action.payload
    },
    setCurrenciesData: (state, action): void => {
      state.data = [...action.payload]
    }
  }
})

export const { setResponseReceived, setCurrenciesData } = currencies.actions
export default currencies.reducer