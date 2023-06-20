import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import useViewportDimensions from '../../hooks/useViewportDimensions'

import { toggleDarkTheme } from '../../../redux/slices/colorTheme'

import { CgClose as CloseHeader } from 'react-icons/cg' 
import { RxMagnifyingGlass as Search } from 'react-icons/rx'
import { 
  HiOutlineSun as LightIcon, 
  HiOutlineMoon as DarkIcon,
  HiOutlineMenu as OpenHeader 
} from 'react-icons/hi'

import "./Header.css"

const Header = () => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const dispatch = useAppDispatch()
  const dimensions = useViewportDimensions()
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false)

  useEffect(() => {
    if(dimensions.width <= 660) return
    setIsHeaderExpanded(false)
  }, [dimensions.width])
  
  const searchSection = (
    <>  
      <button 
        className={`toggleColorTheme${isDarkTheme ? ' darkToggleColorTheme' : ''}`}
        onClick={() => dispatch(toggleDarkTheme())}
      >
        {isDarkTheme ? <LightIcon size={25} color={'black'}/> : <DarkIcon size={25} color={'black'}/>}
      </button>
      <div className={`searchField${isDarkTheme ? ' darkSearch' : ''}`}>
        <button className='submitEntry' type="submit">
          <Search size={20} color={"black"}/>
        </button>
        <input  
          type="search" 
          name="searchBar" 
          className={`searchBar${isDarkTheme ? ' darkSearch' : ''}`}
          placeholder="Search"
        />
      </div>
    </>
  )

  return (
    <header 
      className={`header${isDarkTheme ? ' darkHeader' : ''}`}
      style={{
        height: dimensions.width <= 660 ? isHeaderExpanded ? '128px' : '68px' : 'auto'
      }}
    >
      <div className="headerContainer">
        <a href="http://github.com/KennethOnuorah/CryptoTracker" target="_blank" rel="noopener noreferrer">
          <div className="appName">
            <img src="/images/app_logo.svg" alt="app_logo" width={24} style={{transform: 'translateY(2px)'}}/>
            CryptoTra¢ker
          </div>
        </a>
        <div className='left'>
          {dimensions.width >= 660 ? 
            searchSection :
            <button 
              className='expandHeaderBtn'
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
            >
              {isHeaderExpanded ?
                <CloseHeader color={isDarkTheme ? 'white' : 'black'} size={25}/> :
                <OpenHeader color={isDarkTheme ? 'white' : 'black'} size={25}/>
              }
            </button>
          }
        </div>
      </div>
      {dimensions.width <= 660 && 
        <div className='mobileSearchContainer'>
          {searchSection}
        </div>
      }
    </header>
  )
}

export default Header