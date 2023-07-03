import Analysis from './Analysis/Analysis'
import PriceStatistics from './PriceStatistics/PriceStatistics'
import { FiChevronRight as To } from 'react-icons/fi'

import './TokenPage.css'

const TokenPage = () => {
  return (
    <section className='tokenPage'>
      <div className="top">
        <div className='pagePath'>
          <button className='homeBtn'>
            Home
          </button>
          <span className='pathArrow'>
            <To color={'grey'}/>
          </span>
          <button className='thisPageBtn'>
            [**Token Name Here**] Price
          </button>
        </div>
      </div>
      <div className='analytics'>
        <Analysis/>
        <PriceStatistics/>
      </div>
    </section>
  )
}

export default TokenPage
