import Header from './components/Header/Header'
import Body from './components/Body/Body'
import Footer from './components/Footer/Footer'

import { useAppSelector } from './hooks/redux'

import './App.css'

function App() {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)

  return (
    <div className={`app${isDarkTheme ? ' darkApp' : ''}`}>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}

export default App
