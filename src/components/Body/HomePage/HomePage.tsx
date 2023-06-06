import Chart from "./Chart/Chart"

import { ImFire as TrendIcon } from 'react-icons/im'
import { IoStar as FavoriteIcon } from 'react-icons/io5'

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
    </section>
  )
}

export default HomePage
