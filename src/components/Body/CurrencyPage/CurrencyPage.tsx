import Analysis from './Analysis/Analysis'
import { FiChevronRight as To } from 'react-icons/fi'

import './CurrencyPage.css'

const CurrencyPage = () => {
  return (
    <section className='currencyPage'>
      <div className="top">
        <div className='pagePath'>
          <button className='homeBtn'>
            Home
          </button>
          <span className='pathArrow'>
            <To color={'grey'}/>
          </span>
          <button className='thisPageBtn'>
            Bitcoin Price
          </button>
        </div>
      </div>
      <div className='analytics'>
        <Analysis/>
        <div className="right">
          Right section
        </div>
      </div>
    </section>
  )
}

export default CurrencyPage
