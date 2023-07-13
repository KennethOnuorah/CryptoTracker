import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import useViewportDimensions from '../../hooks/useViewportDimensions'
import { validateQuery } from '../../utils/validateQuery'

import { Link } from 'react-router-dom'
import { toggleDarkTheme } from '../../../redux/slices/colorTheme'

import { CgClose as CloseHeader } from 'react-icons/cg' 
import { RxMagnifyingGlass as Search } from 'react-icons/rx'
import { HiOutlineSun as LightIcon, HiOutlineMoon as DarkIcon, HiOutlineMenu as OpenHeader } from 'react-icons/hi'

import "./Header.css"

const Header = () => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const coinNameList = useAppSelector(state => state.currenciesReducer.coinData).map(coin => coin.name)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {width,} = useViewportDimensions()
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const searchFieldRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if(width <= 660) return
    setIsHeaderExpanded(false)
  }, [width])
  
  const searchSection = (
    <>  
      <button 
        className={`toggleColorTheme${isDarkTheme ? ' darkToggleColorTheme' : ''}`}
        name='toggle-color-theme'
        onClick={() => dispatch(toggleDarkTheme())}
      >
        {isDarkTheme ? <LightIcon size={25} color={'black'}/> : <DarkIcon size={25} color={'black'}/>}
      </button>
      <div 
        className={`searchField${isDarkTheme ? ' darkSearch' : ''}`} 
        ref={searchFieldRef}
        onAnimationEnd={() => {
          searchFieldRef.current?.classList.remove('shake-animation-trigger')
        }}
      >
        <button 
          className='submitEntry' 
          type="submit"
          onClick={() => {
            if(searchQuery === '') return
            validateQuery(searchQuery, coinNameList)
              .then(result => {
                console.log('You may proceed to', result)
                setIsHeaderExpanded(false)
                navigate(`/${result}`)
              })
              .catch(() => {
                searchFieldRef.current?.classList.add('shake-animation-trigger')
                searchBarRef.current?.classList.add('flash-red-animation-trigger')
                console.error('Invalid search. No results found!')
              })
              .finally(() => {
                if(!searchBarRef.current) return
                searchBarRef.current.value = ''
                searchBarRef.current.blur()
                setSearchQuery('')
              })
          }}
        >
          <Search size={20} color={"black"}/>
        </button>
        <input  
          type="search" 
          name="searchBar"
          ref={searchBarRef}
          className={`searchBar${isDarkTheme ? ' darkSearch' : ''}`}
          placeholder="Search"
          onAnimationEnd={() => {
            searchBarRef.current?.classList.remove('flash-red-animation-trigger')
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if(e.key === 'Enter' && searchQuery !== ''){
              validateQuery(searchQuery, coinNameList)
                .then(result => {
                  console.log('You may proceed to', result)
                  setIsHeaderExpanded(false)
                  navigate(`/${result}`)
                })
                .catch(() => {
                  searchFieldRef.current?.classList.add('shake-animation-trigger')
                  searchBarRef.current?.classList.add('flash-red-animation-trigger')
                  console.error('Invalid search. No results found!')
                })
                .finally(() => {
                  if(!searchBarRef.current) return
                  searchBarRef.current.value = ''
                  searchBarRef.current.blur()
                  setSearchQuery('')
                })
            }
          }}
        />
      </div>
    </>
  )

  return (
    <header 
      className={`header${isDarkTheme ? ' darkHeader' : ''}`}
      style={{
        height: width <= 660 ? isHeaderExpanded ? '128px' : '68px' : 'auto'
      }}
    >
      <div className="headerContainer">
        <Link to="/">
          <div className="appName">
            <img src="/images/app_logo.svg" alt="app_logo" width={24} style={{transform: 'translateY(2px)'}}/>
            CryptoTra¢ker
          </div>
        </Link>
        <div className='left'>
          {width >= 660 ? 
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
      {width <= 660 && 
        <div className='mobileSearchContainer'>
          {searchSection}
        </div>
      }
    </header>
  )
}

export default Header