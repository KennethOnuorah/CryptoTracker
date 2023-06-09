import Chart from "./Chart/Chart"
import News from "./News/News"

import { useAppSelector } from "../../../hooks/redux"

import { ImFire as TrendIcon } from 'react-icons/im'
import { IoStar as FavoriteIcon } from 'react-icons/io5'
import { HiNewspaper as NewsIcon } from 'react-icons/hi2'

import "./HomePage.css"

const HomePage = () => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const popularTrends = useAppSelector(state => state.popularTrendsReducer.popularTrends)
  
  return (
    <section className="homepage">
      <Chart 
        title="Popular Trends" 
        subtitle="Today's most popular cryptocurrencies"
        icon={<TrendIcon color={"firebrick"} style={{flexShrink: 0, transform: "translateY(3px)"}}/>}
        data={popularTrends}
      />
      <Chart
        title="Favorites"
        icon={<FavoriteIcon color={"goldenrod"} style={{flexShrink: 0, transform: "translateY(3px)"}}/>}
        data={popularTrends} //For now, keep it as popular trends
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
