import { createSlice } from '@reduxjs/toolkit'
import { NewsData } from '../../src/helpers/types'

interface initialNewsProps {
  data: NewsData
}

const initialState: initialNewsProps = {
  data: {
    status: "",
    totalResults: 0,
    articles: []
  }
}

export const news = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action): void => {
      state.data = {...action.payload}
      localStorage.setItem("time_last_fetched_news", JSON.stringify(Date.now()))
    }
  }
})

export const { setNews } = news.actions
export default news.reducer