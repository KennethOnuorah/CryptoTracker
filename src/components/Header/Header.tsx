import { RxMagnifyingGlass as Search } from 'react-icons/rx'

import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <div className="appName">
        CryptoTracker
      </div>
      <div className="searchField">
        <button type="submit">
          <Search size={20} color={"gray"}/>
        </button>
        <input type="search" name="searchBar" className="searchBar" placeholder="Search..."/>
      </div>
    </header>
  )
}

export default Header