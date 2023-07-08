import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../../hooks/redux'
import { CoinData } from '../../../../../helpers/types'

import { IoSparklesSharp as SparkleIcon } from 'react-icons/io5'
import './Recommended.css'

interface RecommendedProps{
  analyzedTokenName: string
}

const Recommended = ({ analyzedTokenName } : RecommendedProps) => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const filteredTokens = useAppSelector(state => state.currenciesReducer.coinData).filter(coin => coin.name !== analyzedTokenName)
  const [recommendedTokens, setRecommendedTokens] = useState<CoinData[]>()

  useEffect(() => {
    setRecommendedTokens([..._.sampleSize([...filteredTokens], 6)])
  }, [])

  return (
    <section className='recommended'>
      <div className={`heading${isDarkTheme ? ' darkHeading' : ''}`}>
        <SparkleIcon size={40} color={'goldenrod'}/>
        You Might Also Like . . .
      </div>
      <div 
        className={`recommendations`}
        style={{
          color: isDarkTheme ? 'white' : 'black',
          backgroundColor: isDarkTheme ? "#161616" : 'white'
        }}
      >
        {recommendedTokens?.map(token => 
          <button 
            className={`recommendation`}
            style={{
              color: isDarkTheme ? 'white' : 'black',
              backgroundColor: isDarkTheme ? '#262626' : 'white',
            }}
          >
            <img src={token.image} title={`${token.name}`} alt={`${token.name} logo`} width={32} height={32}/>
            <div className="left">
              <div className="title">
                <span title={`${token.name}`} className='name'>{token.name.length <= 8 ? token.name : `${token.name.substring(0, 8)}...`.replace(' ...', '...')}</span>
                <span className='symbol'> {token.symbol.toUpperCase()}</span>
              </div>
              <div className="numbers">
                <span className='price'>${token.current_price.toLocaleString()}</span>
                <span 
                  className="dayChange"
                  style={{
                    color: token.price_change_percentage_24h > 0 ? 'green' : 'red'
                  }}
                >
                  {token.price_change_percentage_24h > 0 ? '+' : ''}{token.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </div>  
            </div>
          </button>)}
      </div>
    </section>
  )
}

export default Recommended
