import { RxMagnifyingGlass as Search, RxGithubLogo as GitHub } from 'react-icons/rx'

import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <div className="headerContainer">
        <div className="appName">
          CryptoTra¢ker
        </div>
        <div className='left'>
          <a 
            className='visitRepo' 
            href='https://github.com/KennethOnuorah/CryptoTracker' 
            title='Visit repository'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GitHub size={25} color={'white'}/>
          </a>
          <div className="searchField">
            <button type="submit">
              <Search size={20} color={"black"}/>
            </button>
            <input type="search" name="searchBar" className="searchBar" placeholder="Search"/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header