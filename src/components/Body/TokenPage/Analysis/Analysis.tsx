import { useState, useRef, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../hooks/redux'
import useLineChart from '../../../../hooks/useLineChart'
import useIntervalFetch from '../../../../hooks/useIntervalFetch'
import useViewportDimensions from '../../../../hooks/useViewportDimensions'
import { useCountUp } from 'use-count-up'

import { setCoinData } from '../../../../../redux/slices/currencies'
import { setFavoritesList } from '../../../../../redux/slices/favorites'
import { setCoordinates } from '../../../../../redux/slices/lineChart'

import LineChart from './LineChart/LineChart'
import IndividualTimeFilter from './LineChart/IndividualTimeFilter/IndividualTimeFilter'
import ToggleTimeFilter from './LineChart/ToggleTimeFilter/ToggleTimeFilter'
import OtherTrackings from './OtherTrackings/OtherTrackings'
import Recommended from './Recommended/Recommended'

import { TimeFilter } from '../../../../helpers/types'
import { CURRENCY_API_URL } from '../../../../helpers/links'
import { HiOutlineHeart as HeartEmptyIcon, HiHeart as HeartFilledIcon } from 'react-icons/hi'

import './Analysis.css'

interface AnalysisProps{
  name: string
}

const Analysis = ({ name } : AnalysisProps) => {
  const dispatch = useAppDispatch()
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const token = useAppSelector(state => state.currenciesReducer.coinData).filter(coin => coin.name === name)[0]
  const favoritesList = useAppSelector(state => state.favoritesReducer.favoritesList)
  const isTokenFavorited = favoritesList.includes(token.name)
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('3d')
  const previousCountedPrice = useRef(0)

  const { value: countedPrice, reset: resetCountedPrice } = useCountUp({
    isCounting: true,
    decimalPlaces: Number.isInteger(token.current_price) ? 0 : 2,
    thousandsSeparator: ',',
    start: previousCountedPrice.current,
    end: token.current_price,
    duration: 3.5,
    onComplete: () => {
      previousCountedPrice.current = token.current_price
    },
  })

  const currentPlotData = useLineChart({
    prices: token.sparkline_in_7d?.price as number[], 
    action: setCoordinates,
    analyzedToken: token,
    timeLastUpdated: token.last_updated,
    timeFilter: timeFilter
  })

  useIntervalFetch({
    URL: CURRENCY_API_URL,
    interval: 60000,
    checkpoint: 360000,
    action: setCoinData,
    fetchID: "crypto"
  })

  const {width,} = useViewportDimensions()

  useEffect(() => {
    resetCountedPrice()
  }, [previousCountedPrice.current])

  return (
    <section className='analysis'>
      <div className="analyzedCurrency">
        <div className={`leftSection${isDarkTheme ? ' darkLeftSection' : ''}`}>
          <img src={token.image} alt={`${token.name} logo`} width={32}/>
          <div>
            <span className='fullName'>{token.name}</span>
            <span className='symbol'> {token.symbol.toUpperCase()}</span>
          </div>
        </div>
        <div className="rightSection">
          <button 
            className='addToFavorites'
            onClick={() => {
              isTokenFavorited ? 
                dispatch(setFavoritesList(favoritesList.filter((f) => f !== token.name))) :
                dispatch(setFavoritesList([...favoritesList, token.name]))
            }}
          >
            {isTokenFavorited ? <HeartFilledIcon size={width >= 500 ? 20 : 32}/> : <HeartEmptyIcon size={width >= 500 ? 20 : 32}/>}
            {width >= 500 && (isTokenFavorited ? 'Remove from Favorites' : "Add to Favorites")}
          </button>
        </div>
      </div>
      <div className={`graph${isDarkTheme ? ' darkGraph' : ''}`}>
        <div className={`heading${isDarkTheme ? ' darkHeading' : ''}`}>
          <div className='currentPrice'>
            <span className='currentPrice'>${countedPrice?.toLocaleString()} USD </span>
            <span 
              className='priceChange'
              style={{
                color: token.price_change_percentage_24h >= 0 ? 'green' : 'red'
              }}
            >
              {token.price_change_percentage_24h > 0 ? '+' : ''}
              {token.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
          <div className='options'>
            {token.name} Price Chart (USD) ({timeFilter === '1d' ? '24H' : timeFilter.toUpperCase()})
            <div className="timeFilters" role='group'>
              {width >= 515 ? 
                <>
                  <IndividualTimeFilter timeFilter='1d' currentTimeFilter={timeFilter} dispatch={setTimeFilter}>
                    24H
                  </IndividualTimeFilter>
                  <IndividualTimeFilter timeFilter='3d' currentTimeFilter={timeFilter} dispatch={setTimeFilter}>
                    3D
                  </IndividualTimeFilter>
                  <IndividualTimeFilter timeFilter='5d' currentTimeFilter={timeFilter} dispatch={setTimeFilter}>
                    5D
                  </IndividualTimeFilter>
                  <IndividualTimeFilter timeFilter='7d' currentTimeFilter={timeFilter} dispatch={setTimeFilter}>
                    7D
                  </IndividualTimeFilter>
                </> :
                <ToggleTimeFilter dispatch={setTimeFilter}/>
              }
            </div>
          </div>
        </div>
        <LineChart 
          plotData={currentPlotData} 
          plotName={`${token.id}_linechart`}
          color={token.price_change_percentage_24h as number >= 0 ? "#4fc71f" : '#b00000'}
          yLabel='Price (USD)'
          timeFilter={timeFilter}
        />
        <OtherTrackings
          data={token}
        />
      </div>
      {width >= 1300 && <Recommended analyzedTokenName={token.name}/>}
    </section>
  )
}

export default Analysis