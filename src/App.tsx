import Header from './components/Header/Header'
import Body from './components/Body/Body'
import Footer from './components/Footer/Footer'

import { useAppSelector } from './hooks/redux'
import useTrends from './hooks/useTrends'

import { POPULAR_TRENDS_URL } from './helpers/links'

import './App.css'

function App() {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)

  // useTrends(POPULAR_TRENDS_URL)
  // console.log("The 'popular trends' API has been called.")

  return (
    <div className={`app${isDarkTheme ? ' darkApp' : ''}`}>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}

export default App
