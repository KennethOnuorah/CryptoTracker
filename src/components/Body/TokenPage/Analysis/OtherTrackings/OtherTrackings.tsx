import { CoinData } from "../../../../../helpers/types"
import { useAppSelector } from "../../../../../hooks/redux"
import { abbreviateNumber } from "../../../../../utils/abbreviateNumber"

import './OtherTrackings.css'

interface OtherTrackingsProps{
  data: CoinData
}

const OtherTrackings = ({ data } : OtherTrackingsProps) => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)

  return (
    <section className="otherTrackings">
      <div className={`tracked-item${isDarkTheme ? ' dark-tracked-item' : ''}`}>
        <div className="title">
          Total Volume (USD)
        </div>
        ${abbreviateNumber(data.total_volume, 2)}
      </div>
      <div className={`tracked-item${isDarkTheme ? ' dark-tracked-item' : ''}`}>
        <div className="title">
          Market Cap (USD)
        </div>
        ${abbreviateNumber(data.market_cap, 2)}
      </div>
      <div className={`tracked-item${isDarkTheme ? ' dark-tracked-item' : ''}`}>
        <div className="title">
          Circulating Supply
        </div>
        {abbreviateNumber(data.circulating_supply, 2)} {data.symbol.toUpperCase()}
      </div>
      <div className={`tracked-item${isDarkTheme ? ' dark-tracked-item' : ''}`}>
        <div className="title">
          Max Supply
        </div>
        {abbreviateNumber(data.max_supply, 2)} {data.symbol.toUpperCase()}
      </div>
    </section>
  )
}

export default OtherTrackings
