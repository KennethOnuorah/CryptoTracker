import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import useViewportDimensions from '../../hooks/useViewportDimensions'
import { toggleDarkTheme } from '../../../redux/slices/colorTheme'

import { RxMagnifyingGlass as Search } from 'react-icons/rx'
import { 
  HiOutlineSun as LightIcon, 
  HiOutlineMoon as DarkIcon,
  HiOutlineMenu as MenuIcon 
} from 'react-icons/hi'

import "./Header.css"

const Header = () => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const dispatch = useAppDispatch()

  const dimensions = useViewportDimensions()

  const desktopSearchSection = (
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
    <header className={`header${isDarkTheme ? ' darkHeader' : ''}`}>
      <div className="headerContainer">
        <a href="http://github.com/KennethOnuorah/CryptoTracker" target="_blank" rel="noopener noreferrer">
          <div className="appName">
            CryptoTra¢ker
          </div>
        </a>
        <div className='left'>
          {dimensions.width >= 590 ? 
            desktopSearchSection :
            <button className='sideMenuBtn'>
              <MenuIcon color={isDarkTheme ? 'white' : 'black'} size={30}/>
            </button>
          }
        </div>
      </div>
    </header>
  )
}

export default Header