import { useState } from 'react'
import _ from 'lodash'

import Entry from "./Entry/Entry"
import { useAppSelector } from "../../../../../hooks/redux"
import { CoinData, FieldProperties, OrderBy } from "../../../../../helpers/types"

import "./CurrencyTable.css"

interface CurrencyTableProps{
  fields: FieldProperties[],
  data: CoinData[],
}

const CurrencyTable = ({ fields, data } : CurrencyTableProps) => {
  const [sortBy, setSortBy] = useState<OrderBy>('market_cap')
  const [isDataDescending, setIsDataDescending] = useState(true)
  
  const orderedData = _.orderBy(data, data => {
    if(typeof data[sortBy] === 'string'){
      return data[sortBy]?.toString().toLowerCase()
    }else{
      return data[sortBy]
    }
  }, 
  isDataDescending ? 'desc' : 'asc')
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  
  return (
    <>
      <table className={`currencyTable${isDarkTheme ? ' darkCurrencyTable' : ''}`}>
        <thead className={`fields${isDarkTheme ? ' darkFields' : ''}`}>
          <tr>
            {fields.map((f, index) =>
              <th 
                key={index} 
                className={`${f.name}${isDarkTheme ? ' darkFieldsTh' : ''}`}
              >
                {(f.name !== '') &&
                  (f.name !== 'sparkline_in_7d') ? 
                  <button
                    onClick={() => {
                      setSortBy(f.orderBy)
                      setIsDataDescending(!isDataDescending)
                    }}
                    style={{
                      color: isDarkTheme ? 'white' : 'black'
                    }}
                  >
                    {f.styledName}
                  </button> : f.styledName
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
      {orderedData.length <= 0 && 
        <h1 style={{
          textAlign: 'center',
          color: isDarkTheme ? 'white' : 'black',
          backgroundColor: isDarkTheme ? '#000000' : '#ececec',
          padding: '20px',
          borderRadius: '5px'
        }}>
          <em>Nothing to show here for now.</em>
        </h1>
      }
    </>
  )
} 

export default CurrencyTable
