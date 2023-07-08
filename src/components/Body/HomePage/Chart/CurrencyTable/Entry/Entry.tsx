import { useEffect, useRef } from 'react'
import { useCountUp } from 'use-count-up'
import { useAppSelector, useAppDispatch } from '../../../../../../hooks/redux'
import useLineChart from '../../../../../../hooks/useLineChart'

import LineChart from '../../../../TokenPage/Analysis/LineChart/LineChart'

import { setFavoritesList } from '../../../../../../../redux/slices/favorites'

import { abbreviateNumber } from '../../../../../../utils/abbreviateNumber'
import { Coordinate } from '../../../../../../helpers/types'
import { entry7dSparklineOptions } from '../../../../../../helpers/apexOptions'
import { HiOutlineHeart as HeartEmptyIcon, HiHeart as HeartFilledIcon } from 'react-icons/hi'

import "./Entry.css"

interface EntryProps{
  index: number,
  logoSrc: string,
  name: string,
  abbreviation: string,
  price: number,
  dayChange: number,
  marketCap: number,
}

const Entry = ({...props} : EntryProps) => {
  const dispatch = useAppDispatch()
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const allFavorites = useAppSelector(state => state.favoritesReducer.favoritesList)
  const entryCoinData = useAppSelector(state => state.currenciesReducer.coinData).filter(coin => coin.name === props.name)[0]

  const isFavorited = allFavorites.includes(props.name)

  const previousCountedPrice = useRef(0)
  const previousCountedDayChange = useRef(0)

  const { value: countedPrice, reset: resetCountedPrice } = useCountUp({
    isCounting: true,
    decimalPlaces: Number.isInteger(props.price) ? 0 : 2,
    thousandsSeparator: ',',
    start: previousCountedPrice.current,
    end: props.price,
    duration: 3.5,
    onComplete: () => {
      previousCountedPrice.current = props.price
    },
  })

  const { value: countedDayChange, reset: resetCountedDayChange } = useCountUp({
    isCounting: true,
    decimalPlaces: 2,
    start: previousCountedDayChange.current,
    end: props.dayChange,
    duration: 3.5,
    onComplete: () => {
      previousCountedDayChange.current = props.dayChange
    },
  })

  const coordinates = useLineChart({
    prices: entryCoinData.sparkline_in_7d?.price as number[],
    analyzedToken: entryCoinData,
    timeLastUpdated: entryCoinData.last_updated,
    timeFilter: '7d'
  })

  useEffect(() => {
    resetCountedPrice()
    resetCountedDayChange()
  }, [previousCountedPrice.current, previousCountedDayChange.current])

  return (
    <tr className={`tableEntry${isDarkTheme ? ' darkTableEntry' : ''}`}>
      <th className="index">{props.index}</th>
      <th className="name">
        <a href="#">
          <div className="group">
            <img src={props.logoSrc} height={"25px"}/>
            <div className="nameDisplay">
              {props.name}
              <br/>
              <div className="abbreviation">
                {props.abbreviation.toUpperCase()}
              </div>
            </div>
          </div>
        </a>
      </th>
      <th className="price">
        ${countedPrice?.toLocaleString()}
      </th>
      <th
        className="24hChange"
        style={{ 
          color: countedDayChange as number > 0 ? "green" : "red", 
          transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        {countedDayChange as number > 0 ? '+' : ''}{countedDayChange?.toLocaleString()}%
      </th>
      <th className="marketCap">${abbreviateNumber(props.marketCap, 1)}</th>
      <th className="sparkline7d">
        <LineChart
          plotData={coordinates as Coordinate[]}
          size={{width: '145px', height: '100px'}}
          color={entryCoinData.price_change_percentage_7d_in_currency as number >= 0 ? "#4fc71f" : '#b00000'}
          yLabel=''
          timeFilter='7d'
          customOptions={entry7dSparklineOptions}
        />
      </th>
      <th>
        <button 
          className='favoriteBtn' 
          onClick={() => {
            if(!isFavorited){
              dispatch(setFavoritesList([...allFavorites, props.name]))
            }else{
              const updatedFavorites = allFavorites.filter(fav => fav !== props.name)
              dispatch(setFavoritesList(updatedFavorites))
            }
          }}
        >
          {isFavorited ? 
            <HeartFilledIcon 
              size={20} 
              color={'goldenrod'}
              style={{ transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"}}
            /> : 
            <HeartEmptyIcon 
              size={20} 
              color={isDarkTheme ? 'white' : 'black'}
              style={{transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"}}
            />
          }
        </button>
      </th>
    </tr>
  )
}

export default Entry
