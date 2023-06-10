import { useAppSelector } from '../../../../../../hooks/redux'

import { HiOutlineStar as FavoriteIcon } from 'react-icons/hi'
import { abbreviate } from '../../../../../../utils/abbreviate'

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

const Entry = ({ 
  index,
  logoSrc,
  name,
  abbreviation,
  price,
  dayChange,
  marketCap
 } : EntryProps) => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const isDeclining: boolean = dayChange < 0
  
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
        ${price.toLocaleString()}
      </th>
      <th   
        className="24hChange"
        style={{
          color: isDeclining ? "red" : "green" 
        }}
      >
        {dayChange > 0 ? '+' : ''}{dayChange.toFixed(2)}%
      </th>
      <th className="marketCap">${abbreviate(marketCap)}</th>
      <th>
        <button className='favoriteBtn' title={`Add ${abbreviation.toUpperCase()} to favorites`}>
          <FavoriteIcon 
            size={20} 
            color={isDarkTheme ? 'white' : 'black'}
            style={{
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          />
        </button>
      </th>
    </tr>
  )
}

export default Entry
