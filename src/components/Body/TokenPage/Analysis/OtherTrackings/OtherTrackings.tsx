import { CoinData } from "../../../../../helpers/types"
import { abbreviateNumber } from "../../../../../utils/abbreviateNumber"

import './OtherTrackings.css'

interface OtherTrackingsProps{
  data: CoinData
}

const OtherTrackings = ({ data } : OtherTrackingsProps) => {
  return (
    <section className="otherTrackings">
      <div className="tracked-item">
        <div className="title">
          Total Volume (USD)
          <hr/>
        </div>
        ${abbreviateNumber(data.total_volume, 2)}
      </div>
      <div className="tracked-item">
        <div className="title">
          Market Cap (USD)
          <hr/>
        </div>
        ${abbreviateNumber(data.market_cap, 2)}
      </div>
      <div className="tracked-item">
        <div className="title">
          Circulating Supply
          <hr/>
        </div>
        {abbreviateNumber(data.circulating_supply, 2)} {data.symbol.toUpperCase()}
      </div>
      <div className="tracked-item">
        <div className="title">
          Max Supply
          <hr/>
        </div>
        {abbreviateNumber(data.max_supply, 2)} {data.symbol.toUpperCase()}
      </div>
    </section>
  )
}

export default OtherTrackings
