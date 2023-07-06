import Analysis from './Analysis/Analysis'
import PriceStatistics from './PriceStatistics/PriceStatistics'
import Conversions from './Conversions/Conversions'
import { FiChevronRight as To } from 'react-icons/fi'

import './TokenPage.css'
import { useAppSelector } from '../../../hooks/redux'

const TokenPage = () => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  
  return (
    <section className='tokenPage'>
      <div className="top">
        <div className='breadcrumbs'>
          <button className={`homeButton${isDarkTheme ? ' darkButton' : ''}`}>
            Home
          </button>
          <span className='pathArrow'>
            <To color={'grey'}/>
          </span>
          <button className={`currentPageButton${isDarkTheme ? ' darkButton' : ''}`}>
            Bitcoin Price
          </button>
        </div>
      </div>
      <div className='analytics'>
        <Analysis/>
        <div className="right">
          <PriceStatistics/>
          <Conversions/>
        </div>
      </div>
    </section>
  )
}

export default TokenPage
