import { TimeFilter } from '../../../../../helpers/types'
import './LineChartTimeFilter.css'

interface LineChartTimeFilterProps{
  timeFilter: TimeFilter
  currentTimeFilter: TimeFilter
  dispatch: React.Dispatch<React.SetStateAction<TimeFilter>>
  children: React.ReactNode
}

const LineChartTimeFilter = ({ currentTimeFilter, timeFilter, dispatch, children } : LineChartTimeFilterProps) => {
  return (
    <button
      className='timeFilter'
      onClick={() => dispatch(timeFilter)}
      style={{
        backgroundColor: currentTimeFilter === timeFilter ? "#c0c0c0" : '#E5E5E5'
      }}
    >
      {children}
    </button>
  )
}

export default LineChartTimeFilter
