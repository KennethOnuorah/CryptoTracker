import { useState, useRef, useEffect } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { setCurrenciesData } from '../../../../../redux/slices/currencies'
import useUpdatePlotData from '../../../../hooks/useUpdatePlotData'
import useIntervalFetch from '../../../../hooks/useIntervalFetch'
import { useCountUp } from 'use-count-up'

import LineChart from '../../../LineChart'

import { TimeFilter } from '../../../../helpers/types'
import { CURRENCY_API_URL } from '../../../../helpers/links'
import { HiOutlineHeart as HeartIcon } from 'react-icons/hi'

import './Analysis.css'
import OtherTrackings from './OtherTrackings/OtherTrackings'

const Analysis = () => {
  //Example
  const token = useAppSelector(state => state.currenciesReducer.data.filter(coin => coin.id === 'bitcoin'))
  const plotData = useAppSelector(state => state.lineChartReducer.plotData)
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('1d')
  const previousCountedPrice = useRef(0)

  const { value: countedPrice, reset: resetCountedPrice } = useCountUp({
    isCounting: true,
    decimalPlaces: Number.isInteger(token[0].current_price) ? 0 : 2,
    thousandsSeparator: ',',
    start: previousCountedPrice.current,
    end: token[0].current_price,
    duration: 3.5,
    onComplete: () => {
      previousCountedPrice.current = token[0].current_price
    },
  })

  useUpdatePlotData({
    prices: token[0].sparkline_in_7d?.price as number[], 
    timeLastUpdated: token[0].last_updated,
    timeFilter: timeFilter
  }, [timeFilter, token[0].id])

  useIntervalFetch({
    URL: CURRENCY_API_URL,
    interval: 60000,
    checkpoint: 360000,
    action: setCurrenciesData,
    fetchID: "crypto"
  })

  useEffect(() => {
    resetCountedPrice()
  }, [previousCountedPrice.current])

  return (
    <section className='analysis'>
      <div className="analyzedCurrency">
        <div className='leftSection'>
          <img src={token[0].image} alt="currencyImage" width={32}/>
          <div>
            <span className='fullName'>{token[0].name}</span>
            <span className='symbol'> {token[0].symbol.toUpperCase()}</span>
          </div>
        </div>
        <button className='addToFavorites'>
          <HeartIcon size={20}/>
          Add to Favorites
        </button>
      </div>
      <div className="graph">
        <div className="heading">
          <div className='currentPrice'>
            <span className='currentPrice'>${countedPrice?.toLocaleString()} USD </span>
            <span 
              className='priceChange'
              style={{
                color: token[0].price_change_percentage_24h >= 0 ? 'green' : 'red'
              }}
            >
              {token[0].price_change_percentage_24h > 0 ? '+' : ''}
              {token[0].price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
          <div className='options'>
            {token[0].name} Price Chart (USD) ({timeFilter === '1d' ? '24H' : timeFilter.toUpperCase()})
            <div className="timeFilters" role='group'>
              <button 
                onClick={() => setTimeFilter('1d')}
                style={{
                  backgroundColor: timeFilter === '1d' ? "#c0c0c0" : '#E5E5E5'
                }}
              >24H</button>
              <button 
                onClick={() => setTimeFilter('3d')}
                style={{
                  backgroundColor: timeFilter === '3d' ? "#c0c0c0" : '#E5E5E5'
                }}
              >3D</button>
              <button 
                onClick={() => setTimeFilter('5d')}
                style={{
                  backgroundColor: timeFilter === '5d' ? "#c0c0c0" : '#E5E5E5'
                }}
              >5D</button>
              <button 
                onClick={() => setTimeFilter('7d')}
                style={{
                  backgroundColor: timeFilter === '7d' ? "#c0c0c0" : '#E5E5E5'
                }}
              >7D</button>
            </div>
          </div>
        </div>
        <LineChart 
          plotData={plotData}
          plotName={`${token[0].name}_${timeFilter}`}
          color='#DAA520'
          yLabel='Price (USD)'
          timeFilter={timeFilter}
        />
        <OtherTrackings
          data={token[0]}
        />
      </div>
    </section>
  )
}

export default Analysis
