import CurrencyTable from '../../CurrencyTable/CurrencyTable'
import { FiTrendingUp as TrendIcon } from 'react-icons/fi'

import "./PopularTrends.css"

const PopularTrends = () => {
  return (
    <section className='popularTrends'>
      <div className="heading">
        <title className='title'>
          Popular Trends
          <TrendIcon/>
        </title>
        <div className="subtitle">
          Today's highest cryptocurrency prices
        </div>
      </div>
      <CurrencyTable 
        fields={["#", "Name", "Price", "24h%", "Market Cap", "7d chart"]}
      />
    </section>
  )
}

export default PopularTrends
