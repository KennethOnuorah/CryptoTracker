import { useState } from 'react'
import _ from 'lodash'

import Entry from "./Entry/Entry"
import { useAppSelector } from "../../../../../hooks/redux"
import { CoinData, FieldProperty, SortType } from "../../../../../helpers/types"

import "./CurrencyTable.css"

interface CurrencyTableProps{
  fields: FieldProperty[],
  data: CoinData[],
}

const CurrencyTable = ({ fields, data } : CurrencyTableProps) => {
  const [sortBy, setSortBy] = useState<SortType>('market_cap')
  const [isDataDescending, setIsDataDescending] = useState(true)
  
  const orderedData = _.orderBy(data, data => data[sortBy].toString().toLowerCase(), isDataDescending ? 'desc' : 'asc')
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  
  return (
    <table className={`currencyTable${isDarkTheme ? ' darkCurrencyTable' : ''}`}>
      <thead className="fields">
        <tr>
          {fields.map((f, index) =>
            <th 
              key={index} 
              className={`${f.name}`}
            >
              {f.name !== '' &&
                <button
                  onClick={() => {
                    setSortBy(f.sortType)
                    setIsDataDescending(!isDataDescending)
                  }}
                >
                  {f.styledName}
                </button>
              }
            </th>)
          }
        </tr>
      </thead>
      <tbody>
        {orderedData.map((coin, index) => 
          <Entry
            key={index}
            index={coin.market_cap_rank}
            logoSrc={coin.image}
            name={coin.name}
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
