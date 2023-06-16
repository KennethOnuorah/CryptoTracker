import { useAppSelector, useAppDispatch } from '../../../../../../hooks/redux'
import { setFavoritesList } from '../../../../../../../redux/slices/favorites'

import { HiOutlineStar as StarEmptyIcon, HiStar as StarFilledIcon } from 'react-icons/hi'
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
  marketCap,
 } : EntryProps) => {
  const dispatch = useAppDispatch()
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const allFavorites = useAppSelector(state => state.favoritesReducer.favoritesList)

  const isPriceDeclining = dayChange < 0
  const isFavorite = allFavorites.includes(name)

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
          color: isPriceDeclining ? "red" : "green", 
          transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        {dayChange > 0 ? '+' : ''}{dayChange.toFixed(2)}%
      </th>
      <th className="marketCap">${abbreviate(marketCap)}</th>
      <th>
        <button 
          className='favoriteBtn' 
          onClick={() => {
            if(!isFavorite){
              dispatch(setFavoritesList([...allFavorites, name]))
            }else{
              const updatedFavorites = allFavorites.filter(fav => fav !== name)
              dispatch(setFavoritesList(updatedFavorites))
            }
          }}
        >
          {isFavorite ? 
            <StarFilledIcon 
              size={20} 
              color={'goldenrod'}
              style={{ transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"}}
            /> : 
            <StarEmptyIcon 
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
