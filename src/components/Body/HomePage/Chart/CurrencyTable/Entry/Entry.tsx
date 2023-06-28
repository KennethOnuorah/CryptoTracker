import { useEffect, useRef } from 'react'
import { useCountUp } from 'use-count-up'
import { useAppSelector, useAppDispatch } from '../../../../../../hooks/redux'

import { setFavoritesList } from '../../../../../../../redux/slices/favorites'

import { HiOutlineHeart as HeartEmptyIcon, HiHeart as HeartFilledIcon } from 'react-icons/hi'
import { abbreviateNumber } from '../../../../../../utils/abbreviateNumber'

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

const Entry = ({index, logoSrc, name, abbreviation, price, dayChange, marketCap} : EntryProps) => {
  const dispatch = useAppDispatch()
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const allFavorites = useAppSelector(state => state.favoritesReducer.favoritesList)

  const isFavorited = allFavorites.includes(name)

  const previousCountedPrice = useRef(0)
  const previousCountedDayChange = useRef(0)

  const { value: countedPrice, reset: resetCountedPrice } = useCountUp({
    isCounting: true,
    decimalPlaces: Number.isInteger(price) ? 0 : 2,
    thousandsSeparator: ',',
    start: previousCountedPrice.current,
    end: price,
    duration: 3.5,
    onComplete: () => {
      previousCountedPrice.current = price
    },
  })

  const { value: countedDayChange, reset: resetCountedDayChange } = useCountUp({
    isCounting: true,
    decimalPlaces: 2,
    start: previousCountedDayChange.current,
    end: dayChange,
    duration: 3.5,
    onComplete: () => {
      previousCountedDayChange.current = dayChange
    },
  })

  useEffect(() => {
    resetCountedPrice()
    resetCountedDayChange()
  }, [previousCountedPrice.current, previousCountedDayChange.current])

  return (
    <tr className={`tableEntry${isDarkTheme ? ' darkTableEntry' : ''}`}>
      <th className="index">{index}</th>
      <th className="name">
        <a href="#">
          <div className="group">
            <img src={logoSrc} height={"25px"}/>
            <div className="nameDisplay">
              {name}
              <br/>
              <div className="abbreviation">
                {abbreviation.toUpperCase()}
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
      <th className="marketCap">${abbreviateNumber(marketCap, 1)}</th>
      <th>
        <button 
          className='favoriteBtn' 
          onClick={() => {
            if(!isFavorited){
              dispatch(setFavoritesList([...allFavorites, name]))
            }else{
              const updatedFavorites = allFavorites.filter(fav => fav !== name)
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
              style={{ transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"}}
            />
          }
        </button>
      </th>
    </tr>
  )
}

export default Entry
