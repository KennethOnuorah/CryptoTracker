import { createSlice } from '@reduxjs/toolkit'
import { CoinData, ExchangeData } from '../../src/helpers/types'

interface initalCurrenciesProps{
  coinData: CoinData[]
  exchangeData: ExchangeData
}

const initialState: initalCurrenciesProps = {
  coinData: [],
  exchangeData: {
    "result": "",
    "documentation": "",
    "terms_of_use": "",
    "time_last_update_unix": 0,
    "time_last_update_utc": "0",
    "time_next_update_unix": 0,
    "time_next_update_utc": "0",
    "base_code": "",
    "conversion_rates": {}
  }
}

export const currencies = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setCoinData: (state, action): void => {
      state.coinData = action.payload
      localStorage.setItem("time_last_fetched_crypto", JSON.stringify(Date.now()))
    },
    setExchangeData: (state, action): void => {
      state.exchangeData = {...action.payload}
      localStorage.setItem("time_last_fetched_exchange", JSON.stringify(Date.now()))
    }
  }
})

export const { setCoinData, setExchangeData } = currencies.actions
export default currencies.reducer