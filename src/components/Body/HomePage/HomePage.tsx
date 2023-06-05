import Chart from "./Chart/Chart"

import { FiTrendingUp as TrendIcon } from 'react-icons/fi'

import "./HomePage.css"

const HomePage = () => {
  return (
    <section className="homepage">
      <Chart 
        title="Popular Trends" 
        subtitle="Today's highest cryptocurrency prices"
        icon={<TrendIcon/>}
      />
    </section>
  )
}

export default HomePage
