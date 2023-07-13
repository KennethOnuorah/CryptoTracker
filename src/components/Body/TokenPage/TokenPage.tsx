import { useEffect } from 'react'
import { useAppSelector } from '../../../hooks/redux'
import { useParams, useNavigate } from 'react-router-dom'
import useViewportDimensions from '../../../hooks/useViewportDimensions'

import Analysis from './Analysis/Analysis'
import PriceStatistics from './PriceStatistics/PriceStatistics'
import Conversions from './Conversions/Conversions'
import Recommended from './Analysis/Recommended/Recommended'

import { FiChevronRight as To } from 'react-icons/fi'

import './TokenPage.css'

const TokenPage = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const coinNameList = useAppSelector(state => state.currenciesReducer.coinData).map(data => data.name)
  const nameExists = coinNameList.includes(name as string)
  const nameSymbol = nameExists ? useAppSelector(state => state.currenciesReducer.coinData).filter(data => data.name === name)[0].symbol : ''

  const {width,} = useViewportDimensions()
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `CryptoTracker • ${name}`
  }, [])

  useEffect(() => {
    if(nameExists) return
    navigate('/')
  }, [name])

  return (
    <section className='tokenPage'>
      <div className="top">
        {nameExists && 
          <div className='breadcrumbs'>
            <button 
              className={`homeButton${isDarkTheme ? ' darkButton' : ''}`}
              onClick={() => navigate('/')}
            >
              Home
            </button>
            <span className='pathArrow'>
              <To color={'grey'}/>
            </span>
            <div className={`currentPageButton${isDarkTheme ? ' darkButton' : ''}`}>
              {name} Price
            </div>
          </div>
        }
      </div>
      <div className='analytics'>
        {nameExists && <Analysis name={name as string}/>}
        <div className="right">
          {nameExists && <PriceStatistics name={name as string}/>}
          {nameExists && <Conversions tokenSymbol={nameSymbol.toUpperCase()}/>}
          {nameExists && (width < 800 && <Recommended analyzedTokenName={name as string}/>)}
        </div>
      </div>
      {nameExists && ((width < 1300 && width >= 800) && <Recommended analyzedTokenName={name as string}/>)}
    </section>
  )
}

export default TokenPage
