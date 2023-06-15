import { useEffect } from "react"

import Chart from "./Chart/Chart"
import News from "./News/News"

import { useAppSelector } from "../../../hooks/redux"
import useIntervalFetch from "../../../hooks/useIntervalFetch"

import { setCurrenciesData } from "../../../../redux/slices/currencies"
import { CURRENCY_DATA_URL } from "../../../helpers/links"
import { CoinData } from "../../../helpers/types"

import { ImFire as TrendIcon } from 'react-icons/im'
import { IoStar as FavoriteIcon } from 'react-icons/io5'
import { HiNewspaper as NewsIcon } from 'react-icons/hi2'

import "./HomePage.css"

const HomePage = () => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const currenciesData = useAppSelector(state => state.currenciesReducer.data)
  const favoritesList = useAppSelector(state => state.favoritesReducer.namesOfFavorites)

  const popularCurrencies = currenciesData.slice(0, 10)
  const favoriteCurrencies = favoritesList.map(fav => currenciesData.find(curr => curr.name === fav)).filter((f): f is CoinData => f !== undefined)

  // useIntervalFetch({
  //   URL: /*CURRENCY_DATA_URL*/ '',
  //   interval: 60000,
  //   action: setCurrenciesData
  // })

  useEffect(() => {
    const data = window.localStorage.getItem("cryptocurrency_data")
    setCurrenciesData(data)
  }, [])

  return (
    <section className="homepage">
      <Chart 
        title="Popular Trends" 
        subtitle="Top 10 most popular cryptocurrencies"
        icon={<TrendIcon color={"firebrick"} style={{flexShrink: 0, transform: "translateY(3px)"}}/>}
        data={popularCurrencies}
      />
      <Chart
        title="Favorites"
        icon={<FavoriteIcon color={"goldenrod"} style={{flexShrink: 0, transform: "translateY(3px)"}}/>}
        data={favoriteCurrencies}
      />
      <News
        title="News"
        subtitle="Daily updates and insights on the crypto market"
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
      />
    </section>
  )
}

export default HomePage
