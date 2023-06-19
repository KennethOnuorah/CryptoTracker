import Chart from "./Chart/Chart"
import News from "./News/News"

import { useAppSelector } from "../../../hooks/redux"
import useIntervalFetch from "../../../hooks/useIntervalFetch"

import { setCurrenciesData } from "../../../../redux/slices/currencies"
import { setNews } from "../../../../redux/slices/news"
import { CURRENCY_API_URL, NEWS_API_URL } from "../../../helpers/links"
import { CoinData } from "../../../helpers/types"

import { ImFire as TrendIcon } from 'react-icons/im'
import { IoHeart as FavoriteIcon } from 'react-icons/io5'
import { HiNewspaper as NewsIcon } from 'react-icons/hi2'

import "./HomePage.css"

const HomePage = () => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const currenciesData = useAppSelector(state => state.currenciesReducer.data)
  const favoritesList = useAppSelector(state => state.favoritesReducer.favoritesList)
  const news = useAppSelector(state => state.newsReducer.data)

  const popularCurrencies = currenciesData.slice(0, 10)
  const favoriteCurrencies = favoritesList.map(fav => currenciesData.find(curr => curr.name === fav)).filter((f): f is CoinData => f !== undefined)

  useIntervalFetch({
    URL: CURRENCY_API_URL,
    interval: 60000,
    checkpoint: 360000,
    action: setCurrenciesData,
    fetchID: "crypto"
  })

  useIntervalFetch({
    URL: NEWS_API_URL,
    interval: 60000,
    checkpoint: 8.64e+7,
    action: setNews,
    fetchID: "news"
  })

  return (
    <section className="homepage">
      <Chart 
        title="Popular Trends" 
        subtitle="Top 10 most popular tokens"
        icon={<TrendIcon color={"red"} style={{flexShrink: 0, transform: "translateY(3px)"}}/>}
        data={popularCurrencies}
      />
      <Chart
        title="Favorites"
        icon={<FavoriteIcon color={"red"} style={{flexShrink: 0, transform: "translateY(3px)"}}/>}
        data={favoriteCurrencies}
      />
      <News
        title="Daily News"
        subtitle="Stay caught up on the latest events"
        icon={
          <NewsIcon 
            color={isDarkTheme ? 'white' : "#2e2e2e"} 
            style={{
              flexShrink: 0, 
              transform: "translateY(3px)",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          />
        }
        data={news}
      />
    </section>
  )
}

export default HomePage
