import { useAppSelector } from '../../../../hooks/redux'
import './PriceStatistics.css'

const PriceStatistics = () => {
  const allPrices = useAppSelector(state => state.lineChartReducer.coordinates).map(coord => coord.y)
  const currentPrice = allPrices.slice(-1)
  const prices24h = allPrices.slice(allPrices.length - 24)
  const prices3d = allPrices.slice(allPrices.length - 72)
  const prices5d = allPrices.slice(allPrices.length - 120)

  return (
    <aside className="priceStatistics">
      <div className="title">
        [**Token Name**] Price Statistics
      </div>
      <div className='stats'>
        <div className="columnTitles">
          <span style={{fontWeight: 500}}>[**Token Name**] Price</span>
          <span>${currentPrice?.toLocaleString()}</span>
        </div>
        <div className="highLow">
          <div className="title">
            24h high / 24h low
          </div>
          ${Math.max(...prices24h).toLocaleString()} /
          <br />
          ${Math.min(...prices24h).toLocaleString()}
        </div>
        <div className="highLow">
          <div className="title">
            3d high / 3d low
          </div>
          ${Math.max(...prices3d).toLocaleString()} /
          <br />
          ${Math.min(...prices3d).toLocaleString()}
        </div>
        <div className="highLow">
          <div className="title">
            5d high / 5d low
          </div>
          ${Math.max(...prices5d).toLocaleString()} /
          <br />
          ${Math.min(...prices5d).toLocaleString()}
        </div>
        <div className="highLow">
          <div className="title">
            7d high / 7d low
          </div>
          ${Math.max(...allPrices).toLocaleString()} /
          <br />
          ${Math.min(...allPrices).toLocaleString()}
        </div>
      </div>
    </aside>
  )
}

export default PriceStatistics
