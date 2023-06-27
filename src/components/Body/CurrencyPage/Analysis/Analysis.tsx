import { useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { setCurrenciesData } from '../../../../../redux/slices/currencies'
import useUpdatePlotData from '../../../../hooks/useUpdatePlotData'
import useIntervalFetch from '../../../../hooks/useIntervalFetch'

import LineChart from '../../../LineChart'

import { TimeFilter } from '../../../../helpers/types'
import { CURRENCY_API_URL } from '../../../../helpers/links'
import { HiOutlineHeart as HeartIcon } from 'react-icons/hi'

import './Analysis.css'

const Analysis = () => {
  //Example
  const currency = useAppSelector(state => state.currenciesReducer.data.filter(coin => coin.id === 'bitcoin'))
  const plotData = useAppSelector(state => state.lineChartReducer.plotData)
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7d')

  useUpdatePlotData({
    prices: currency[0].sparkline_in_7d?.price as number[], 
    timeLastUpdated: currency[0].last_updated,
    timeFilter: timeFilter
  }, [timeFilter])

  useIntervalFetch({
    URL: CURRENCY_API_URL,
    interval: 60000,
    checkpoint: 360000,
    action: setCurrenciesData,
    fetchID: "crypto"
  })

  return (
    <section className='analysis'>
      <div className="currency">
        <div className='left'>
          <img src="/images/bitcoin.svg" alt="currencyImage" width={32}/>
          <div>
            <span className='fullName'>Bitcoin</span>
            <span className='symbol'> BTC</span>
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
            <span className='currentPrice'>${currency[0].current_price.toLocaleString()} USD </span>
            <span className='priceChange'>+2.27%</span>
          </div>
          <div className='options'>
            Bitcoin Price Chart (USD) ({timeFilter === '1d' ? '24H' : timeFilter.toUpperCase()})
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
          yLabel='Price (USD)'
          timeFilter={timeFilter}
          timeLastUpdated={currency[0].last_updated}
        />
      </div>
    </section>
  )
}

export default Analysis
