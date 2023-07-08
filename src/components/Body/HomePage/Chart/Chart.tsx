import CurrencyTable from "./CurrencyTable/CurrencyTable"
import { TbArrowsExchange2 as ChangeIcon } from 'react-icons/tb'

import { useAppSelector } from "../../../../hooks/redux"

import { CoinData } from "../../../../helpers/types"

import "./Chart.css"

interface ChartProps{
  title: string,
  subtitle?: string,
  icon: JSX.Element,
  data: CoinData[],
}

const Chart = ({ title, subtitle, icon, data } : ChartProps) => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)

  return (
    <section className='chart'>
      <div className="heading">
        <title 
          className='title'
          style={{
            color: isDarkTheme ? 'white' : 'black'
          }}
        >
          {title}
          {icon}
        </title>
        <div 
          className="subtitle"
          style={{
            color: isDarkTheme ? 'gray' : "rgb(110, 110, 110)"
          }}
        >
          {subtitle}
        </div>
      </div>
      <CurrencyTable 
        fields={[
          {
            name: '#',
            styledName: '#',
            orderBy: 'market_cap_rank'
          },
          {
            name: 'name',
            styledName: 'Name',
            orderBy: 'name',
          },
          {
            name: 'price',
            styledName: 'Price',
            orderBy: 'current_price'
          },
          {
            name: 'dayChange',
            styledName: <ChangeIcon size={20} style={{flexShrink: 0, transform: 'translateY(3px)'}}/>,
            orderBy: 'price_change_percentage_24h',
          },
          {
            name: 'marketCap',
            styledName: 'Market Cap',
            orderBy: 'market_cap',
          },
          {
            name: 'sparkline_in_7d',
            styledName: '7d Sparkline',
            orderBy: 'sparkline_in_7d'
          },
          {
            name: '',
            styledName: '',
            orderBy: 'market_cap_rank',
          },
        ]}
        data={data}
        
      />
    </section>
  )
}

export default Chart
