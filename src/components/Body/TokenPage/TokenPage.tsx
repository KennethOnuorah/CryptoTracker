import Analysis from './Analysis/Analysis'
import PriceStatistics from './PriceStatistics/PriceStatistics'
import Conversions from './Conversions/Conversions'
import Recommended from './Analysis/Recommended/Recommended'

import { useAppSelector } from '../../../hooks/redux'
import useViewportDimensions from '../../../hooks/useViewportDimensions'

import { FiChevronRight as To } from 'react-icons/fi'

import './TokenPage.css'

const TokenPage = () => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const {width,} = useViewportDimensions()

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
          {width < 800 && <Recommended analyzedTokenName={'Bitcoin'}/>}
        </div>
      </div>
      {(width < 1300 && width >= 800) && <Recommended analyzedTokenName={'Bitcoin'}/>}
    </section>
  )
}

export default TokenPage
