import Entry from "./Entry/Entry"
import { useAppSelector } from "../../../../../hooks/redux"

import { CoinData } from "../../../../../helpers/types"

import "./CurrencyTable.css"

interface CurrencyTableProps{
  fields: any[],
  data: CoinData[]
}

const CurrencyTable = ({ fields, data } : CurrencyTableProps) => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)

  return (
    <table className={`currencyTable${isDarkTheme ? ' darkCurrencyTable' : ''}`}>
      <thead className="fields">
        <tr>
          {fields.map((f, index) => <th key={index} className={`${f}`}>{f}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((coin, index) => 
          <Entry
            key={index}
            index={index + 1}
            logoSrc={coin.image}
            name={coin.id}
            abbreviation={coin.symbol}
            price={coin.current_price}
            dayChange={coin.price_change_percentage_24h}
            marketCap={coin.market_cap}
          />
        )}  
      </tbody>
    </table>
  )
} 

export default CurrencyTable
