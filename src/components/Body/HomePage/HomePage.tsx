import Chart from "./Chart/Chart"
import News from "./News/News"

import { ImFire as TrendIcon } from 'react-icons/im'
import { IoStar as FavoriteIcon } from 'react-icons/io5'
import { HiNewspaper as NewsIcon } from 'react-icons/hi2'

import "./HomePage.css"

const HomePage = () => {
  return (
    <section className="homepage">
      <Chart 
        title="Popular Trends" 
        subtitle="Today's most popular cryptocurrencies"
        icon={<TrendIcon color={"firebrick"} style={{flexShrink: 0, transform: "translateY(3px)"}}/>}
      />
      <Chart
        title="Favorites"
        icon={<FavoriteIcon color={"goldenrod"} style={{flexShrink: 0, transform: "translateY(3px)"}}/>}
      />
      <News
        title="News"
        subtitle="Current events in the crypto market"
        icon={<NewsIcon color={"#2e2e2e"} style={{flexShrink: 0, transform: "translateY(3px)"}}/>}
      />
    </section>
  )
}

export default HomePage
